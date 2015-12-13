/*
 * preconditions:
 * - typeof obj === 'object'
 * - index >= 0
 */
function accessor (obj, array, index) {
    var ref = obj
    var n = array.length - 1
    var i = index
    var key = array[i]
    while (i < n) {
        if (ref.hasOwnProperty(key)) {
            ref = ref[key]
        } else {
            break
        }
        key = array[++i]
    }

    var result = {
        parent: ref,
        key: key,
        stop: i
    }

    return result
}

module.exports = accessor
