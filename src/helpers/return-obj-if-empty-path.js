function returnObjIfEmptyPath (obj, path, value) {
    return path.length > 0 ? value : obj
}

module.exports = returnObjIfEmptyPath
