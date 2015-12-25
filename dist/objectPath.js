var _ = {}

;['Function', 'String', 'Number'].forEach(function (name) {
    _['is' + name] = function (obj) {
        return Object.prototype.toString.call(obj) === '[object ' + name + ']'
    }
})

var toString = {}.toString

var isArray = Array.isArray || function (arr) {
    return toString.call(arr) === '[object Array]'
}

function returnObjIfEmptyPath (obj, path, value) {
    return path.length > 0 ? value : obj
}

var isString = _.isString
var isFunction = _.isFunction
var bracketRegexp = /\['((?:\\'|[^'])*)'\]|\["((?:\\"|[^"])*)"\]|\[(\d+)\]/g
var pointRegexp = /[^.\[]+/g

function getToken (string, start) {
    if (start >= string.length) {
        return null
    }
    var matches
    var match
    var isBracketExpression = string[start] === '['
    var regexp = isBracketExpression ? bracketRegexp : pointRegexp
    regexp.lastIndex = start
    matches = regexp.exec(string)
    if (isBracketExpression) {
        if (matches) {
            match = replace(matches[1], '\\\'', '\'') || ''
            if (match === undefined) {
                match = replace(matches[2], '\\"', '"') || ''
            }
            if (match === undefined) {
                match = parseInt(matches[3])
            }
        }
        match = matches && (
            replace(matches[1], '\\\'', '\'') ||
            replace(matches[2], '\\"', '"') ||
            parseInt(matches[3])
        )
    } else if (start === 0 || string[start++] === '.') {
        match = matches && matches[0]
    }
    if (!matches) {
        throw new Error(string.substr(start) + ' is not correct string path')
    } else if (start + matches[0].length !== regexp.lastIndex) {
        throw new Error(string.substring(start, matches[0].length) + ' is not correct string path')
    }
    return {
        value: match === 0 ? 0 : match || '',
        next: regexp.lastIndex
    }
}

function replace (str, a, b) {
    if (isString(str)) {
        return str.replace(a, b)
    }
}

function parser (string) {
    var index = 0
    var array = []
    while (true) {
        var token = getToken(string, index)
        if (!token) {
            break
        }
        array.push(token.value)
        index = token.next
    }
    return array
}

function pathNormalizer (path) {
    if (isArray(path)) {
        return path
    } else if (isString(path) && path !== '') {
        return parser(path)
    } else {
        return [path]
    }
}

function accessor (obj, array, cb, index) {
    index = index || 0
    if (obj !== undefined && obj !== null) {
        var ref = obj
        var n = array.length - 1
        var i = index
        var key = array[i]

        while (i < n) {
            if (ref.hasOwnProperty(key)) {
                ref = ref[key]
            } else {
                break
            }
            key = array[++i]
        }

        return cb(ref, key, ref[key], i === array.length - 1 && ref.hasOwnProperty(key), i)
    }
}

function creator (obj, array, newValue, options, modifier, index) {
    var n = array.length
    var base = obj
    var i = index
    var key = array[i]
    for (++i; i < n; ++i) {
        var prevKey = key
        key = array[i]
        base = base[prevKey] = _.isNumber(key) ? [] : {}
    }

    return modifier(base, key, newValue, base[key], false, options)
}

function modifier (base, name, newValue, oldValue, exists, options) {
    var filter = options.filter
    if (!filter || filter(oldValue, exists, base, name)) {
        options.cb(base, name, newValue, oldValue)
    }
    return options.old ? oldValue : base[name]
}

function mutator (obj, path, options, newValue, index) {
    if (path.length === 0) {
        return obj
    }
    return accessor(obj, path, function (base, name, oldValue, exists, stop) {
        if (options.create && !exists) {
            return creator(base, path, newValue, options, modifier, stop)
        } else {
            return modifier(base, name, newValue, oldValue, exists, options)
        }
    }, index)
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

function factory (objectPath, parser, methods) {
    Object.keys(methods).forEach(function (method) {
        objectPath[method] = function (obj, path, value) {
            path = parser(path)
            return methods[method](obj, path, value)
        }
    })
}

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

function get (obj, path, def) {
    return accessor(obj, path, function (base, name, value, exists) {
        return returnObjIfEmptyPath(obj, path, !exists ? def : value)
    })
}

function has (obj, path) {
    return accessor(obj, path, function (parent, key, oldValue, exists) {
        return exists
    })
}

function set (base, name, value) {
    base[name] = value
}

function empty (base, name) {
    var value = base[name]
    if (value !== undefined && value !== null && isFunction(value.constructor)) {
        base[name] = (new value.constructor()).valueOf()
    }
}

function del (base, name) {
    delete base[name]
}

function coalesce (obj, paths, def) {
    var exists
    var value
    for (var i = 0; i < paths.length && !exists; ++i) {
        /*eslint no-loop-func: 0*/
        exists = accessor(obj, paths[i], function (base, name, val, exists) {
            value = val
            return exists
        })
    }
    return exists ? value : def
}

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
        create: true,
        filter: function (value) {
            return !isArray(value)
        },
        old: false
    })
    return value.push.apply(value, args)
}

module.exports = objectPath
