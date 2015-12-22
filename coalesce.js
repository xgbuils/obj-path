var accessor = require('./src/core/accessor')

function coalesce (obj, paths) {
    for (var i = 0; i < paths.length; ++i) {
        var value
        var exists = accessor(obj, paths[i], function (base, name, val, exists) {
            value = val
            return exists
        })
        if (exists) {
            return value
        }
    }
}

module.exports = coalesce
