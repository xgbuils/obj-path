var mutator = require('../core/mutator')
var returnObjIfEmptyPath = require('../helpers/return-obj-if-empty-path')

function set (obj, path, value) {
    return mutator(obj, path, true, function (base, name, oldValue) {
        base[name] = value
        return returnObjIfEmptyPath(obj, path, oldValue)
    })
}

module.exports = set
