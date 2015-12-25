var accessor = require('./accessor')
var creator = require('./creator')
var modifier = require('./modifier')

function mutator (obj, path, options, newValue, index) {
    if (path.length === 0) {
        return obj
    }
    return accessor(obj, path, function (base, name, oldValue, exists, stop) {
        if (options.create && !exists) {
            return creator(base, path, newValue, options, modifier, stop)
        } else {
            return modifier(base, name, newValue, oldValue, exists, options)
        }
    }, index)
}

module.exports = mutator
