var accessor = require('./src/core/accessor')

function get (obj, path, def) {
    return accessor(obj, path, 0, function (parent, key, oldValue, stop) {
        return (stop < path.length - 1 || !parent.hasOwnProperty(key)) ? def : oldValue
    })
}

module.exports = get
