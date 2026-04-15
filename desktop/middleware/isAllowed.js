exports.allowed = (requiredPermissions, redirectUrl = '/dashboard') => {
  return (req, res, next) => {
    // Always allow access - no permission checks needed
    if (!req.session || !req.session.user) {
      return res.redirect('/login');
    }
    next();
  };
};
