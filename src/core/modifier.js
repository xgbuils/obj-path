function modifier (base, name, newValue, oldValue, exists, options) {
    var filter = options.filter
    if (!filter || filter(oldValue, exists, base, name)) {
        options.cb(base, name, newValue, oldValue)
    }
    return options.old ? oldValue : base[name]
}

module.exports = modifier
