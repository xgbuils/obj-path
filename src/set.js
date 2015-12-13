var pathNormalizer = require('./helpers/pathNormalizer')
var accessor = require('./accessor')
var creator = require('./creator')

function set (obj, path, value) {
    path = pathNormalizer(path)
    var reference = accessor(obj, path, 0)
    var stop = reference.stop
    if (stop < path.length - 1) {
        reference = creator(obj, path, stop)
    }
    reference.parent[reference.key] = value
}

module.exports = set
