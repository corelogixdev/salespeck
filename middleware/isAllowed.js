exports.allowed = (requiredPermissions, redirectUrl = '/dashboard') => {
  return (req, res, next) => {
    try {
        
      if (!req.session || !req.session.user) {
        return res.redirect('/login');
      }

      // Ensure the user has permissions
      const userPermissions = Object.keys(req.session.permissions) || [];
      const hasPermission = requiredPermissions.every((perm) =>
        userPermissions.includes(perm)
      );

      if (!hasPermission) {
        return res.redirect(redirectUrl);
      }

      next();
    } catch (err) {
      console.error("Error in permissions middleware:", err);
      res.status(500).send("Internal Server Error");
    }
  };
};
