var strictAccessor = require('./src/core/strict-accessor')

function empty (obj, path) {
    return strictAccessor(obj, path, function (base, name, value) {
        base[name] = (new value.constructor()).valueOf()
        return value
    })
}

module.exports = empty
