const { hasPermission } = require("../utils/rolePermissions");

exports.allowed = (requiredPermissions, redirectUrl = "/dashboard") => {
  return (req, res, next) => {
    if (!req.session || (!req.session.user && !req.session.user_id)) {
      return res.redirect("/login");
    }

    const required = Array.isArray(requiredPermissions)
      ? requiredPermissions
      : [requiredPermissions];

    // "all" means any authenticated user with settings/all flag (branch managers)
    const perms = res.locals.permissions || {};
    if (!hasPermission(perms, required)) {
      if (req.xhr || String(req.headers.accept || "").includes("application/json")) {
        return res.status(403).json({
          status: "error",
          message: "You do not have permission for this action.",
        });
      }
      req.session.message = {
        type: "error",
        text: "You do not have permission for this action.",
      };
      return res.redirect(redirectUrl);
    }

    next();
  };
};
