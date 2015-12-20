function factory (parser, methods) {
    return Object.keys(methods).reduce(function (memo, method) {
        memo[method] = function () {
            var args = [].slice.call(arguments)
            args[1] = parser(args[1])
            return methods[method].apply(this, [].slice.call(args))
        }
        return memo
    }, {})
}

module.exports = factory
