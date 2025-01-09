// middleware/isAuthenticated.js
module.exports = (req, res, next) => {
  if (req.session.user_id) {
    return next();
  } else {
    res.redirect('/login');
  }
};