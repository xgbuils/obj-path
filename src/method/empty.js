var strictAccessor = require('../core/strict-accessor')
var returnObjIfEmptyPath = require('../helpers/return-obj-if-empty-path')

function empty (obj, path) {
    return strictAccessor(obj, path, function (base, name, value) {
        base[name] = (new value.constructor()).valueOf()
        return returnObjIfEmptyPath(obj, path, value)
    })
}

module.exports = empty
