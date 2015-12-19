var accessor = require('./accessor')
var creator = require('./creator')

function mutator (obj, path, index, cb) {
    return accessor(obj, path, index, function (parent, key, oldValue, stop) {
        if (stop < path.length - 1) {
            return creator(obj, path, stop, cb)
        } else {
            return cb(parent, key, oldValue)
        }
    })
}

module.exports = mutator
