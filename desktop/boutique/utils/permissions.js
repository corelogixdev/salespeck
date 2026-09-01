class PermissionsManager {
  constructor() {
    this.permissions = {};
  }
  addPermission(permission) {
    this.permissions[permission] = true;
  }
  hasPermission(permission) {
    return this.permissions[permission] === true;
  }
}

module.exports = PermissionsManager;