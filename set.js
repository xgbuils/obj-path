var mutator = require('./src/core/mutator')

function set (obj, path, value) {
    return mutator(obj, path, 0, function (parent, key, oldValue) {
        parent[key] = value
        return oldValue
    })
}

module.exports = set
