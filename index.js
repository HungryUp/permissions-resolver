const rolesHelper = {
  rolesInheritance: {
    ROLE_EVERYONE: [],
  },
  rolesPermissions: {
    ROLE_EVERYONE: ['root'],
  },

  // @todo Write test
  // @todo Write doc
  getInheritedRoles(roles = [], { rolesTree } = {}) {
    roles = [].concat(roles);
    rolesTree = rolesTree || rolesHelper.rolesInheritance;
    return roles
      .concat(
        roles
          .map(r => rolesTree[r])
          .map(r => rolesHelper.getInheritedRoles(r, { rolesTree }))
          .reduce((a, b) => a.concat(b), []),
      );
  },

  // @todo Write test
  // @todo Write doc
  getRolePermissions(roles = [], { rolesTree, permissionsTree } = {}) {
    roles = [].concat(roles);
    rolesTree = rolesTree || rolesHelper.rolesInheritance;
    permissionsTree = permissionsTree || rolesHelper.rolesPermissions;
    return rolesHelper
      .getInheritedRoles(roles, { rolesTree })
      .map(r => permissionsTree[r])
      .filter(r => !!r)
      .reduce((a, b) => a.concat(b), []);
  },

  // @todo Write test
  // @todo Write doc
  hasPermission(roles = [], permission, { rolesTree, permissionsTree } = {}) {
    return rolesHelper.getRolePermissions(roles, { rolesTree, permissionsTree }).includes(permission);
  },
};

module.exports = rolesHelper;
