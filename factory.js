function factory (parser, methods) {
    return Object.keys(methods).reduce(function (memo, method) {
        memo[method] = function (obj, path) {
            arguments[1] = parser(path)
            return methods[method].apply(this, [].slice.call(arguments))
        }
        return memo
    }, {})
}

module.exports = factory
