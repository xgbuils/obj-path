var isArray = require('isarray')
var op = require('./op')

function splice (obj, path) {
    var args = [].slice.call(arguments, 2)
    return op(obj, path, {
        op: [].splice,
        filter: isArray,
        create: []
    }, args)
}

module.exports = splice
