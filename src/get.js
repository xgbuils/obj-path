var pathNormalizer = require('./helpers/pathNormalizer')
var accessor = require('./core/accessor')

function get (obj, path, def) {
    path = pathNormalizer(path)
    return accessor(obj, path, 0, function (parent, key, stop) {
        return (stop < path.length - 1 || !parent.hasOwnProperty(key)) ? def : parent[key]
    })
}

module.exports = get
