var pathNormalizer = require('./helpers/pathNormalizer')
var accessor = require('./accessor')

function get (obj, path, def) {
    path = pathNormalizer(path)
    var reference = accessor(obj, path, 0)
    return reference.hasOwnProperty('stop') ? def : reference.parent[reference.key]
}

module.exports = get
