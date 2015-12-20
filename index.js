var factory = require('./factory')

var get = require('./get')
var set = require('./set')
var has = require('./has')
var del = require('./del')
var push = require('./push')
var empty = require('./empty')
var pathNormalizer = require('./src/parser/pathNormalizer')

module.exports = factory(pathNormalizer, {
    get: get,
    set: set,
    has: has,
    del: del,
    push: push,
    empty: empty
})
