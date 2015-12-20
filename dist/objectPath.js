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

function accessor (obj, array, index, cb) {
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

        return cb(ref, key, ref[key], i)
    }
}

function creator (obj, array, index, cb) {
    var n = array.length
    var ref = obj
    var i = index
    var key = array[i]
    for (++i; i < n; ++i) {
        var prevKey = key
        key = array[i]
        ref = ref[prevKey] = _.isNumber(key) ? [] : {}
    }

    return cb(ref, key, undefined)
}

function mutator (obj, path, index, cb) {
    return accessor(obj, path, index, function (parent, key, oldValue, stop) {
        if (stop < path.length - 1) {
            return creator(obj, path, stop, cb)
        } else {
            return cb(parent, key, oldValue)
        }
    })
}

function factory (parser, methods) {
    return Object.keys(methods).reduce(function (memo, method) {
        memo[method] = function (obj, path) {
            arguments[1] = parser(path)
            return methods[method].apply(this, [].slice.call(arguments))
        }
        return memo
    }, {})
}

function get (obj, path, def) {
    return accessor(obj, path, 0, function (parent, key, oldValue, stop) {
        return (stop < path.length - 1 || !parent.hasOwnProperty(key)) ? def : oldValue
    })
}

function set (obj, path, value) {
    return mutator(obj, path, 0, function (parent, key, oldValue) {
        parent[key] = value
        return oldValue
    })
}

function empty (obj, path) {
    return accessor(obj, path, 0, function (parent, key, oldValue) {
        if (parent.hasOwnProperty(key)) {
            if (oldValue !== null && oldValue !== undefined && _.isFunction(oldValue.constructor)) {
                parent[key] = (new oldValue.constructor()).valueOf()
            }
            return oldValue
        }
    })
}

function has (obj, path) {
    return accessor(obj, path, 0, function (parent, key, oldValue, stop) {
        return stop === path.length - 1 && parent.hasOwnProperty(key)
    })
}

function del (obj, path) {
    return accessor(obj, path, 0, function (parent, key, oldValue, stop) {
        if (stop === path.length - 1 && parent.hasOwnProperty(key)) {
            delete parent[key]
            return oldValue
        }
    })
}

module.exports = factory(pathNormalizer, {
    get: get,
    set: set,
    has: has,
    empty: empty,
    del: del
})
