var accessor = require('./src/core/accessor')

function has (obj, path) {
    return accessor(obj, path, function (parent, key, oldValue, exists) {
        return exists
    })
}

module.exports = has
