/*
 * preconditions:
 * - typeof obj === 'object'
 * - index >= 0
 */
function accessor (obj, array, index, cb) {
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

        return cb(ref, key, ref[key], i)
    }
}

module.exports = accessor
