var accessor = require('./accessor')

function strictAccessor (obj, path, cb, index) {
    return accessor(obj, path, function (base, name, value, exists) {
        if (exists) {
            return cb(base, name, value)
        }
    }, index)
}

module.exports = strictAccessor
