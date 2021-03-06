var _ = require('../helpers/type')
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

module.exports = getToken
