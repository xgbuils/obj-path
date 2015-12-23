var accessor = require('../core/accessor')

function coalesce (obj, paths, def) {
    var exists
    var value
    for (var i = 0; i < paths.length && !exists; ++i) {
        /*eslint no-loop-func: 0*/
        exists = accessor(obj, paths[i], function (base, name, val, exists) {
            value = val
            return exists
        })
    }
    return exists ? value : def
}

module.exports = coalesce
