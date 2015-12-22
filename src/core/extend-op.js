var _ = require('../helpers/type')
var mutator = require('./mutator')
var isFunction = _.isFunction

function extendOp (obj, path, cb, args, create, filter, index) {
    return mutator(obj, path, create, function (base, name, value, stop, exists) {
        if (create && !base.hasOwnProperty(name)) {
            value = base[name] = create
        }
        if ((create || exists) && (!isFunction(filter) || filter(value))) {
            cb.apply(value, args)
        }
    }, index)
}

module.exports = extendOp
