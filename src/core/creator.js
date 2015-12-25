var _ = require('../helpers/type')

/*
 * precondition obj !== undefined && obj !== null
 */
function creator (obj, array, newValue, options, modifier, index) {
    var n = array.length
    var base = obj
    var i = index
    var key = array[i]
    for (++i; i < n; ++i) {
        var prevKey = key
        key = array[i]
        base = base[prevKey] = _.isNumber(key) ? [] : {}
    }

    return modifier(base, key, newValue, base[key], false, options)
}

module.exports = creator
