var accessor = require('./accessor')
var creator = require('./creator')

function mutator (obj, path, options) {
    if (!options) {
        options = {}
    }
    var create = options.create
    var cb = options.op
    return accessor(obj, path, 0, function (parent, key, oldValue, stop) {
        if (create && stop < path.length - 1) {
            return creator(parent, path, stop, cb)
        } else {
            return cb(parent, key, oldValue, stop)
        }
    })
}

module.exports = mutator
