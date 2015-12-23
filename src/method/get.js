var accessor = require('../core/accessor')
var returnObjIfEmptyPath = require('../helpers/return-obj-if-empty-path')

function get (obj, path, def) {
    return accessor(obj, path, function (base, name, value, exists) {
        return returnObjIfEmptyPath(obj, path, !exists ? def : value)
    })
}

module.exports = get
