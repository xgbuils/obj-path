/*
 * preconditions:
 * - typeof obj === 'object'
 * - index >= 0
 */
function accessor (obj, array, cb, index) {
    index = index || 0
    if (obj !== undefined && obj !== null) {
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

        return cb(ref, key, ref[key], i === array.length - 1 && ref.hasOwnProperty(key), i)
    }
}

module.exports = accessor
