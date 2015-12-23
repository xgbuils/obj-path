var strictAccessor = require('../core/strict-accessor')
var returnObjIfEmptyPath = require('../helpers/return-obj-if-empty-path')

function del (obj, path) {
    return strictAccessor(obj, path, function (base, name, value) {
        delete base[name]
        return returnObjIfEmptyPath(obj, path, value)
    })
}

module.exports = del
