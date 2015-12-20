var accessor = require('./src/core/accessor')

function has (obj, path) {
    return accessor(obj, path, 0, function (parent, key, oldValue, stop) {
        return stop === path.length - 1 && parent.hasOwnProperty(key)
    })
}

module.exports = has
