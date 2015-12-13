var pathNormalizer = require('./helpers/pathNormalizer')
var accessor = require('./accessor')

function get (obj, path, def) {
    path = pathNormalizer(path)
    var reference = accessor(obj, path, 0)
    var parent = reference.parent
    var key = reference.key
    return (reference.stop < path.length - 1 || !parent.hasOwnProperty(key)) ? def : parent[key]
}

module.exports = get
