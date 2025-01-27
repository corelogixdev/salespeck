const { user: User } = require('../models');
const SimpleCache = require('../utils/cache');

const userCache = new SimpleCache();
module.exports = async (req, res, next) => {
    try {
        res.locals.isAuthenticated = false;
        res.locals.user = null;

        if (!req.session?.user_id) {
            return next();
        }

        // Try to get user from cache
        let userData = userCache.get(req.session.user_id);

        if (!userData) {
            userData = await User.findOne({
                where: { id: req.session.user_id },
                attributes: ['id', 'name', 'username', 'role'],
                raw: true
            });

            if (!userData) {
              req.session = null;
              return res.redirect("/login");
            }

            userCache.set(req.session.user_id, userData);
        }

        res.locals.isAuthenticated = true;
        res.locals.user = userData;
        res.locals.user_id = userData.id;

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
