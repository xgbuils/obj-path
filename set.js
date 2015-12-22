var mutator = require('./src/core/mutator')

function set (obj, path, value) {
    return mutator(obj, path, true, function (base, name, oldValue) {
        base[name] = value
        return oldValue
    })
}

module.exports = set
