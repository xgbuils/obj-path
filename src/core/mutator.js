var accessor = require('./accessor')
var creator = require('./creator')

function mutator (obj, path, create, cb, index) {
    return accessor(obj, path, function (base, name, value, exists, stop) {
        if (create && !exists) {
            return creator(base, path, cb, stop)
        } else {
            return cb(base, name, value, exists, stop)
        }
    }, index)
}

module.exports = mutator
