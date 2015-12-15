var pathNormalizer = require('./helpers/pathNormalizer')
var accessor = require('./core/accessor')
var _ = require('./helpers/type')

function empty (obj, path) {
    path = pathNormalizer(path)
    return accessor(obj, path, 0, function (parent, key) {
        if (parent.hasOwnProperty(key)) {
            var oldValue = parent[key]
            if (oldValue !== null && oldValue !== undefined && _.isFunction(oldValue.constructor)) {
                parent[key] = (new oldValue.constructor()).valueOf()
            }
            return oldValue
        }
    })
}

module.exports = empty
