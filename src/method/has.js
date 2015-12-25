var accessor = require('../core/accessor')

function has (obj, path) {
    return accessor(obj, path, function (base, name, value, exists) {
        return exists
    })
}

module.exports = has
