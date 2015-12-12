var getToken = require('./getToken')

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

module.exports = parser
