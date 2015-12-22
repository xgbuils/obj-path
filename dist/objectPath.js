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

function strictAccessor (obj, path, cb, index) {
    return accessor(obj, path, function (base, name, value, exists) {
        if (exists) {
            return cb(base, name, value)
        }
    }, index)
}

function creator (obj, array, cb, index) {
    var n = array.length
    var ref = obj
    var i = index
    var key = array[i]
    for (++i; i < n; ++i) {
        var prevKey = key
        key = array[i]
        ref = ref[prevKey] = _.isNumber(key) ? [] : {}
    }

    return cb(ref, key, undefined, false, i - 1)
}

function mutator (obj, path, create, cb, index) {
    return accessor(obj, path, function (base, name, value, exists, stop) {
        if (create && !exists) {
            return creator(base, path, cb, stop)
        } else {
            return cb(base, name, value, exists, stop)
        }
    }, index)
}

function extendOp (obj, path, cb, args, create, filter, index) {
    return mutator(obj, path, create, function (base, name, value, stop, exists) {
        if (create && !base.hasOwnProperty(name)) {
            value = base[name] = create
        }
        if ((create || exists) && (!isFunction(filter) || filter(value))) {
            cb.apply(value, args)
        }
    }, index)
}

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

function get (obj, path, def) {
    return accessor(obj, path, function (base, name, value, exists) {
        return !exists ? def : value
    })
}

function set (obj, path, value) {
    return mutator(obj, path, true, function (base, name, oldValue) {
        base[name] = value
        return oldValue
    })
}

function empty (obj, path) {
    return strictAccessor(obj, path, function (base, name, value) {
        base[name] = (new value.constructor()).valueOf()
        return value
    })
}

function has (obj, path) {
    return accessor(obj, path, function (parent, key, oldValue, exists) {
        return exists
    })
}

function del (obj, path) {
    return strictAccessor(obj, path, function (base, name, value) {
        delete base[name]
        return value
    })
}

function push (obj, path) {
    return extendOp(obj, path, [].push, [].slice.call(arguments, 2), [], isArray)
}

module.exports = factory(pathNormalizer, {
    get: get,
    set: set,
    has: has,
    empty: empty,
    push: push,
    del: del
})
