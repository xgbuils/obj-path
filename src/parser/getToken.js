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
        match = matches && (
            replace(matches[1], '\\\'', '\'') ||
            replace(matches[2], '\\"', '"') ||
            parseInt(matches[3]) || ''
        )
    } else if (start === 0 || string[start++] === '.') {
        match = matches && matches[0]
    }
    if (!matches || start + matches[0].length !== regexp.lastIndex) {
        throw new Error('blu')
    }
    return {
        value: match,
        next: regexp.lastIndex
    }
}

function replace (str, a, b) {
    if (str) {
        return str.replace(a, b)
    }
}

module.exports = getToken
