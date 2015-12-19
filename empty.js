var accessor = require('./src/core/accessor')
var _ = require('./src/helpers/type')

function empty (obj, path) {
    return accessor(obj, path, 0, function (parent, key, oldValue) {
        if (parent.hasOwnProperty(key)) {
            if (oldValue !== null && oldValue !== undefined && _.isFunction(oldValue.constructor)) {
                parent[key] = (new oldValue.constructor()).valueOf()
            }
            return oldValue
        }
    })
}

module.exports = empty
