var mutator = require('./core/mutator')

function mutatorFactory (objectPath, parser, config) {
    Object.keys(config).forEach(function (methodName) {
        objectPath[methodName] = function (obj, path, value, options) {
            path = parser(path)
            options = optionsAdapter(options, config[methodName])
            return mutator(obj, path, options, value)
        }
    })
}

function optionsAdapter () {
    var opt = {}
    var optionsList = [].slice.call(arguments)
    var value
    optionsList.forEach(function (options) {
        for (var key in options) {
            if (key === 'ifValue') {
                value = filters[options.ifValue]
                key = 'filter'
            } else if (key === 'returns') {
                value = returns[options.returns]
                key = 'old'
            } else {
                value = options[key]
            }
            if (!opt.hasOwnProperty(key) && value !== undefined) {
                opt[key] = value
            }
        }
    })
    return opt
}

var filters = {
    'exists': function (value, exists) {
        return exists
    },
    'does not exist': function (value, exists) {
        return !exists
    }
}

var returns = {
    old: true
}

module.exports = mutatorFactory

