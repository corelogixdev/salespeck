const db = require("../models");
let permissions = null;
exports.permissions = async (req, res, next) => {
  if (req.session.user_id) {
    if (permissions === null) {
      let allPermissions = await db.permissions.findAll();

      let userPermissions = await db.userpermissions.findAll({
        where: { user_id: req.session.user_id },
        include: [{ model: db.permissions, as: "permission" }],
      });

      let permissionsArray = userPermissions.map((permission) => permission.permission.name);
      if(permissionsArray.includes("all")) {
          permissions = allPermissions.reduce((acc, val) => {
            val.name = val.name.replace(/\.(\w)/g, (match, p1) => p1.toUpperCase());
            acc[val.name] = true;
            return acc;
          }, {});
        }
      else{
        permissions = userPermissions.reduce((acc, val) => {
          val.permission.name = val.permission.name.replace(/\.(\w)/g, (match, p1) => p1.toUpperCase());
          acc[val.permission.name] = true;
          return acc;
        }, {});
      }
    }
  }else{
    permissions = null;
  }
  req.session.permissions = permissions;
  res.locals.permissions = permissions;
  next();
};
