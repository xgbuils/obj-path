var strictAccessor = require('./src/core/strict-accessor')

function del (obj, path) {
    return strictAccessor(obj, path, function (base, name, value) {
        delete base[name]
        return value
    })
}

module.exports = del
