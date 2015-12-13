var pathNormalizer = require('./helpers/pathNormalizer')
var mutator = require('./core/mutator')

function set (obj, path, value) {
    path = pathNormalizer(path)
    return mutator(obj, path, 0, function (parent, key) {
        var oldValue = parent[key]
        parent[key] = value
        return oldValue
    })
}

module.exports = set
