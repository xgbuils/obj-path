var accessor = require('./src/core/accessor')

function get (obj, path, def) {
    return accessor(obj, path, function (base, name, value, exists) {
        return !exists ? def : value
    })
}

module.exports = get
