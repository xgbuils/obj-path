var isArray = require('isarray')
var _ = require('./type')
var parser = require('../parser/parser')

function pathNormalizer (path) {
    if (isArray(path)) {
        return path
    } else if (_.isNumber(path) || path === '') {
        return [path]
    } else if (_.isString(path)) {
        return parser(path)
    } else if (path === undefined || path === null) {
        return []
    } else if (_.isFunction(path.toString)) {
        return parser(path.toString())
    } else {
        throw new Error('bluu')
    }
}

module.exports = pathNormalizer
