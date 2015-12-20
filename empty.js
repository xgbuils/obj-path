var op = require('./op')

function empty (obj, path) {
    return op(obj, path, {
        op: function () {
            this.base[this.name] = (new this.value.constructor()).valueOf()
            return this.value
        },
        ref: true
    })
}

module.exports = empty
