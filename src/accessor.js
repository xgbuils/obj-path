/*
 * preconditions:
 * - typeof obj === 'object'
 * - index >= 0
 */
function accessor (obj, array, index) {
    var stop
    var ref = obj
    var n = array.length - 1
    var i = index
    var key = array[i]
    while (i < n) {
        if (ref.hasOwnProperty(key)) {
            ref = ref[key]
        } else {
            stop = i
            break
        }
        key = array[++i]
    }
    if (!ref.hasOwnProperty(key)) {
        stop = i
    }

    var result = {
        parent: ref,
        key: key
    }
    if (stop !== undefined) {
        result.stop = stop
    }
    return result
}

module.exports = accessor
