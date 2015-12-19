var isArray = require('isarray')
var _ = require('../helpers/type')
var parser = require('../parser/parser')

function pathNormalizer (path) {
    if (isArray(path)) {
        return path
    } else if (_.isString(path) && path !== '') {
        return parser(path)
    } else {
        return [path]
    }
}

module.exports = pathNormalizer
