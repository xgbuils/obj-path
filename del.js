var op = require('./op')

function del (obj, path) {
    return op(obj, path, {
        op: function () {
            delete this.base[this.name]
            return this.value
        },
        ref: true
    })
}

module.exports = del
