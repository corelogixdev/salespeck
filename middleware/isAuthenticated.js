// middleware/isAuthenticated.js
module.exports = (req, res, next) => {
  //console.log('isAuthenticated')
  if (req.session.user_id) {
    return next();
  } else {
    res.redirect('/login');
  }
};