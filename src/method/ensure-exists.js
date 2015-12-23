var mutator = require('../core/mutator')
var returnObjIfEmptyPath = require('../helpers/return-obj-if-empty-path')

function ensureExists (obj, path, value) {
    return mutator(obj, path, true, function (base, name, oldValue, exists) {
        if (!exists) {
            base[name] = value
        }
        return returnObjIfEmptyPath(obj, path, oldValue)
    })
}

module.exports = ensureExists
