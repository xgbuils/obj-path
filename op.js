var _ = require('./src/helpers/type')
var mutator = require('./src/core/mutator')
var isFunction = _.isFunction

function op (obj, path, options, args) {
    if (!options) {
        options = {}
    }
    var filter = options.filter
    var ref = options.ref
    var operation = options.op
    var create = options.create
    return mutator(obj, path, create, function (base, name, value, stop) {
        if (create && !base.hasOwnProperty(name)) {
            value = base[name] = create
        }
        if (base.hasOwnProperty(name) && stop === path.length - 1 && (!isFunction(filter) || filter(value))) {
            return operation.apply(ref ? {
                base: base,
                name: name,
                value: value
            } : value, args)
        }
    })
}

module.exports = op
