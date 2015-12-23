function factory (objectPath, parser, methods) {
    Object.keys(methods).forEach(function (method) {
        objectPath[method] = function () {
            var args = [].slice.call(arguments)
            args[1] = parser(args[1])
            return methods[method].apply(this, [].slice.call(args))
        }
    })
}

module.exports = factory
