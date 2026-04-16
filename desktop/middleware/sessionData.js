const queries = require('../prisma/queries');
const SimpleCache = require('../utils/cache');
const fs = require('fs');
const path = require('path');

const userCache = new SimpleCache();

// Get app version from package.json
function getAppVersion() {
    try {
        const packageJsonPath = path.join(__dirname, '..', 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        return packageJson.version || '1.0.0';
    } catch (error) {
        return '1.0.0';
    }
}

// Get app version (cached)
const appVersion = getAppVersion();

module.exports = async (req, res, next) => {
    try {
        res.locals.isAuthenticated = false;
        res.locals.user = null;
        res.locals.appVersion = appVersion;

        if (!req.session?.user_id) {
            return next();
        }

        // Try to get user from cache
        let userData = userCache.get(req.session.user_id);

        if (!userData) {
            userData = await queries.users.findSessionUserById(req.session.user_id);

            if (!userData) {
                req.session = null;
                return res.redirect("/login");
            }

            userCache.set(req.session.user_id, userData);
        }

        res.locals.isAuthenticated = true;
        res.locals.user = userData;
        res.locals.user_id = userData.id;

        // Set dummy permissions object - all features accessible (no permission checks)
        res.locals.permissions = {
            productsList: true,
            productsCreate: true,
            productsUpdate: true,
            productsDelete: true,
            productsView: true,
            productsSearch: true,
            salesList: true,
            salesCreate: true,
            salesUpdate: true,
            salesDelete: true,
            salesView: true,
            salesSearch: true,
            usersList: true,
            usersCreate: true,
            usersUpdate: true,
            usersDelete: true,
            usersView: true,
            usersSearch: true,
            customersList: true,
            customersCreate: true,
            customersUpdate: true,
            customersDelete: true,
            customersView: true,
            customersSearch: true,
            vendorsList: true,
            vendorsCreate: true,
            vendorsUpdate: true,
            vendorsDelete: true,
            vendorsView: true,
            vendorsSearch: true,
            settings: true,
            purchasesList: true,
            purchasesCreate: true,
            purchasesUpdate: true,
            purchasesDelete: true,
            purchasesView: true,
            purchasesSearch: true,
            taxesList: true,
            taxesView: true,
            brandsList: true,
            brandsView: true,
            categoriesList: true,
            categoriesView: true
        };

        if (req.session.message) {
            res.locals.message = req.session.message;
            delete req.session.message;
        }

        next();
    } catch (error) {
        console.error('Session middleware error:', error);
        next();
    }
};

// Export cache for testing or manual cleanup
module.exports.cache = userCache;
