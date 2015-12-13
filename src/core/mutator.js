var accessor = require('./accessor')
var creator = require('./creator')

function mutator (obj, path, index, cb) {
    return accessor(obj, path, index, function (parent, key, stop) {
        if (stop < path.length - 1) {
            return creator(obj, path, stop, cb)
        } else {
            return cb(parent, key)
        }
    })
}

module.exports = mutator
