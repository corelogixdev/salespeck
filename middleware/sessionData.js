module.exports = (req, res, next) => {
  // Ensure session exists
  if (!req.session) {
    req.session = {}; // Initialize session if not present
  }

  // Check authentication status
  res.locals.isAuthenticated = !!req.session.user_id;

  if (req.session.user_id) {
    res.locals.user_id = req.session.user_id;
    res.locals.user = req.session.user; // Pass user data to views
  }

  // Handle flash messages (if using)
  if (req.session.message) {
    res.locals.message = req.session.message;
    delete req.session.message; // Clear after use
  }

  next();
};
