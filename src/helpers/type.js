['Function', 'String', 'Number'].forEach(function (name) {
    module.exports['is' + name] = function (obj) {
        return Object.prototype.toString.call(obj) === '[object ' + name + ']'
    }
})
