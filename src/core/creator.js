var _ = require('../helpers/type')

/*
 * precondition obj !== undefined && obj !== null
 */
function creator (obj, array, index, cb) {
    var n = array.length
    var ref = obj
    var i = index
    var key = array[i]
    for (++i; i < n; ++i) {
        var prevKey = key
        key = array[i]
        ref = ref[prevKey] = _.isNumber(key) ? [] : {}
    }

    return cb(ref, key, undefined)
}

module.exports = creator
