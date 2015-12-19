var factory = require('./factory')
var set = require('./set')
var get = require('./get')
var empty = require('./empty')
var pathNormalizer = require('./src/parser/pathNormalizer')

module.exports = factory(pathNormalizer, {
    get: get,
    set: set,
    empty: empty
})
