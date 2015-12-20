var mutator = require('./src/core/mutator')

function set (obj, path, value) {
    return mutator(obj, path, {
        op: function (parent, key, oldValue) {
            parent[key] = value
            return oldValue
        },
        create: true
    })
}

module.exports = set
