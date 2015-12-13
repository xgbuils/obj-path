var pathNormalizer = require('./helpers/pathNormalizer')
var mutator = require('./core/mutator')

function empty (obj, path) {
    path = pathNormalizer(path)
    return mutator(obj, path, 0, function (parent, key) {
        var oldValue = parent[key]
        parent[key] = ''
        return oldValue
    })
}

module.exports = empty
