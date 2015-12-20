var isArray = require('isarray')
var op = require('./op')

function push (obj, path) {
    var args = [].slice.call(arguments, 2)
    return op(obj, path, {
        op: [].push,
        filter: isArray,
        create: []
    }, args)
}

module.exports = push
