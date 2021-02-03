const possibleActions = ['WRITE', 'READ', 'DELETE']
const permissionRoutes = ['workshop', 'admin', 'comment', 'message']
const permissions = {
  async verify({ user, method, body, originalUrl }) {
    const isProtected = permissionRoutes.filter(route =>
      originalUrl.includes(route)
    )
    if (isProtected.length > 0) {
      let action
      if (originalUrl.includes('workshop')) {
        switch (method) {
          case 'GET':
            action = 'READ'
            break
          case 'PUT':
            action = 'WRITE'
            break
          case 'DELETE':
            action = 'DELETE'
            break
          case 'POST':
            action = ''
            return user.permissions.CREATE

          default:
            action = ''
        }

        if (action) {
          if (action !== 'READ') {
            return user.permissions[action].includes(body._id)
          } else {
            return user.isAdmin
          }
        } else {
          return false
        }
      } else if (originalUrl.includes('admin')) {
        const actionMap = {
          GET: 'READ',
          PUT: 'WRITE',
          DELETE: 'DELETE'
        }
        console.log(Object.keys(user.permissions))
        return user.permissions.ADMIN.includes(actionMap[method])
      } else {
        action = originalUrl.split('/')[0].toUpperCase()

        return user.permissions.GENERAL.includes(action)
      }
    } else {
      return true
    }
  },
  async grant(user, _id, actions = ['WRITE', 'READ', 'DELETE']) {
    let newPermissions = {}
    for (let key in user.permissions) {
      if (actions.includes(key)) {
        newPermissions[key] = [...user.permissions[key], _id]
      }
    }
    await user.updateOne({
      permissions: {
        ...user.permissions,
        ...newPermissions
      }
    })
  },
  async revoke(user, _id, actions = ['WRITE', 'READ', 'DELETE']) {
    let newPermissions = {}
    for (let key in user.permissions) {
      if (actions.includes(key)) {
        newPermissions[key] = user.permissions[key].filter(
          ObjId => ObjId !== _id
        )
      }
    }
    await user.updateOne({
      permissions: {
        ...user.permissions,
        ...newPermissions
      }
    })
  },
  async revokeAll(_id, actions = ['WRITE', 'READ', 'DELETE']) {
    try {
      let toDelete = {}
      actions.forEach(action => {
        if (!possibleActions.includes(action)) {
          throw new Error(`${action} is not a valid action Selector`)
        } else {
          toDelete[action] = _id
        }
      })

      await User.updateMany(
        {},
        {
          $pull: {
            permissions: {
              ...toDelete
            }
          }
        }
      )
    } catch (e) {
      console.error(e)
      return false
    }

    return false
  }
}

module.exports = permissions
