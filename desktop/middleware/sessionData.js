const queries = require('../prisma/queries');
const SimpleCache = require('../utils/cache');
const fs = require('fs');
const path = require('path');

const userCache = new SimpleCache();

function getAppVersion() {
    try {
        const packageJsonPath = path.join(__dirname, '..', 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        return packageJson.version || '1.0.0';
    } catch (error) {
        return '1.0.0';
    }
}

const appVersion = getAppVersion();

function leanUserFromSession(sessionUser) {
    if (!sessionUser || typeof sessionUser !== 'object') {
        return null;
    }
    return {
        id: sessionUser.id,
        firstname: sessionUser.firstname || sessionUser.username || 'User',
        lastname: sessionUser.lastname || '',
        username: sessionUser.username || '',
        role: sessionUser.role || 'user',
        profile_image_url: sessionUser.profile_image_url || null
    };
}

const { permissionsForRole } = require('../utils/rolePermissions');

function applyUserLocals(res, userData) {
    res.locals.isAuthenticated = true;
    res.locals.user = userData;
    res.locals.user_id = userData.id;
    res.locals.permissions = permissionsForRole(userData.role);
}

module.exports = async (req, res, next) => {
    try {
        res.locals.isAuthenticated = false;
        res.locals.user = null;
        res.locals.appVersion = appVersion;

        try {
            const license = require('../utils/license');
            res.locals.licenseStatus = await license.getLicenseStatus();
        } catch (_) {
            res.locals.licenseStatus = null;
        }

        if (req.session?.message) {
            res.locals.message = req.session.message;
            delete req.session.message;
        }

        const userId = req.session?.user_id || req.session?.user?.id;
        if (!userId) {
            // Last resort: session.user snapshot without id
            const fallback = leanUserFromSession(req.session?.user);
            if (fallback) {
                applyUserLocals(res, fallback);
            }
            return next();
        }

        let userData = userCache.get(userId);

        if (!userData) {
            try {
                userData = await queries.users.findSessionUserById(userId);
            } catch (lookupError) {
                console.error('Session user lookup error:', lookupError);
                userData = null;
            }

            if (!userData) {
                // DB miss / error: keep chrome alive from cookie snapshot
                const fallback = leanUserFromSession(req.session?.user);
                if (fallback) {
                    applyUserLocals(res, fallback);
                    return next();
                }
                req.session = null;
                return res.redirect('/login');
            }

            userCache.set(userId, userData);
        }

        // Refresh lean cookie snapshot so oversized legacy sessions shrink
        req.session.user_id = userData.id;
        req.session.user = leanUserFromSession(userData);

        applyUserLocals(res, userData);
        next();
    } catch (error) {
        console.error('Session middleware error:', error);
        const fallback = leanUserFromSession(req.session?.user);
        if (fallback) {
            applyUserLocals(res, fallback);
        }
        next();
    }
};

module.exports.cache = userCache;
