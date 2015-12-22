var isArray = require('isarray')
var extendOp = require('./src/core/extend-op')

function push (obj, path) {
    return extendOp(obj, path, [].push, [].slice.call(arguments, 2), [], isArray)
}

module.exports = push
