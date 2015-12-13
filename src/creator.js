var _ = require('./helpers/type')

function creator (obj, array, index) {
    var n = array.length
    var ref = obj
    var i = index
    var key = array[index]
    //console.log(obj, prevKey)
    for (++i; i < n; ++i) {
        var prevKey = key
        key = array[i]
        ref = ref[prevKey] = _.isNumber(key) ? [] : {}
    }
    //console.log(ref, prevKey, value)
    return {
        parent: ref,
        key: key
    }
}

module.exports = creator
