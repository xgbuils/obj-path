var isFunction = require('../helpers/type').isFunction

function empty (base, name) {
    var value = base[name]
    if (value !== undefined && value !== null && isFunction(value.constructor)) {
        base[name] = (new value.constructor()).valueOf()
    }
}

module.exports = empty
