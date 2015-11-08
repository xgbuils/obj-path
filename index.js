/* Simple Hello World in Node.js */
//console.log(parse("cba34['ç2\"3a'][23].a"));
//console.log(parse("foo.bar"));
console.log(parse("[254][23]"));

function parseToTokens (string) {
    var offset = 0
    var tokens = []
    var map = {
        '[': 2,
        ']': 3,
        '\\\'': 4,
        '\\"': 5,
        '\'': 's',
        '"': 'q',
        '.': 'p'
    }
    string.replace(/(\d+)|\[|\]|\\'|\\"|'|"|\./g, function (m, d, i) {
        if (offset < i) {
            tokens.push({
                id: 0,
                value: string.substring(offset, i)
            })
        }
        tokens.push({
            id: d ? 1 : map[m],
            value: m
        })
        offset = i + m.length
    })
    if (offset < string.length) {
        tokens.push({
            id: 0,
            value: string.substring(offset, string.length)
        })
    }
    return tokens
}

function parse(string) {
    var tokens = parseToTokens(string)
    var transformed = tokens.map(function (e) {
        return e.id
    }).join('')
    //console.log(transformed)
    var ok = /^([01]+|213|2s[\dq]*s3|2q[\ds]*q3)(p[01]+|213|2s[\dq]*s3|2q[\ds]*q3)*$/.test(transformed)
    if (ok) {
        var status = 'stop'
        var quote = ''
        var arr = ['']
        for (var i = 0; i < tokens.length; ++i) {
            var token = tokens[i]
            //console.log('u', token.value)
            if (status === 'stop') {
                if (token.id === 2) {
                    //console.log(token, quote)
                    if (arr[arr.length - 1]) {
                        arr.push('')
                    }
                    status = 'start'
                    quote = ''
                } else if (token.id === 'p') {
                    if (arr[arr.length - 1]) {
                        arr.push('')
                    }
                } else if (/0|1/.test(token.id)) {
                    arr[arr.length - 1] += token.value
                }
            } else if (status === 'start') {
                if (quote === 'none' || quote === token.id) {
                    status = 'stop'
                    quote = ''
                    arr.push('')
                } else if (!quote && /s|q/.test(token.id)) {
                    quote = token.id
                } else {
                    //console.log(token)
                    var value = token.value
                    if (!quote) {
                        arr[arr.length - 1] = parseInt(value)
                        status = 'stop'
                        quote = 'none'
                        arr.push('')
                    } else {
                        arr[arr.length - 1] += value
                    }
                }
            }
        }
        if (!arr[arr.length - 1]) {
            arr.pop()
        }
    }
    return arr
}

module.exports = parse