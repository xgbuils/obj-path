var isArray = require('isarray')
var extendOp = require('./src/core/extend-op')

function splice (obj, path) {
    return extendOp(obj, path, [].splice, [].slice.call(arguments, 2), [], isArray)
}

module.exports = splice
