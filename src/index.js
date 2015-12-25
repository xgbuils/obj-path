var factory = require('./factory')
var mutatorFactory = require('./mutatorFactory')

var get = require('./method/get')
var has = require('./method/has')
var set = require('./method/set')
var del = require('./method/del')
var empty = require('./method/empty')
var coalesce = require('./method/coalesce')
var pathNormalizer = require('./parser/pathNormalizer')

var isArray = require('isarray')

var objectPath = {}

factory(objectPath, pathNormalizer, {
    get: get,
    has: has
})

factory(objectPath, function (paths) {
    return paths.map(pathNormalizer)
}, {
    coalesce: coalesce
})

mutatorFactory(objectPath, pathNormalizer, {
    set: {
        cb: set,
        create: true,
        returns: 'old'
    },
    del: {
        cb: del,
        ifValue: 'exists',
        returns: 'old'
    },
    empty: {
        cb: empty,
        ifValue: 'exists',
        returns: 'old'
    },
    ensureExists: {
        cb: set,
        create: true,
        ifValue: 'does not exist',
        returns: 'old'
    }
})

objectPath.push = function (obj, path) {
    var args = [].slice.call(arguments, 2)
    var value = objectPath.set(obj, path, [], {
        filter: function (value) {
            return !isArray(value)
        },
        old: false
    })
    return value.push.apply(value, args)
}

module.exports = objectPath
