var factory = require('./factory')

var get = require('./method/get')
var set = require('./method/set')
var has = require('./method/has')
var del = require('./method/del')
var push = require('./method/push')
var empty = require('./method/empty')
var ensureExists = require('./method/ensure-exists')
var coalesce = require('./method/coalesce')
var pathNormalizer = require('./parser/pathNormalizer')

factory(module.exports, pathNormalizer, {
    get: get,
    set: set,
    has: has,
    del: del,
    push: push,
    ensureExists: ensureExists,
    empty: empty
})

factory(module.exports, function (paths) {
    return paths.map(pathNormalizer)
}, {
    coalesce: coalesce
})
