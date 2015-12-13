var expect = require('chai').expect
var accessor = require('../src/accessor')

describe('accessor', function () {
    describe('array path that exists in object and such length is greater than 1', function () {
        context('given { foo: { bar: 3 } } and [\'foo\', \'bar\'] with index 0', function () {
            it('returns correct reference', function () {
                var obj = {
                    foo: {
                        bar: 3
                    }
                }
                expect(accessor(obj, ['foo', 'bar'], 0)).to.be.deep.equal({
                    parent: obj.foo,
                    key: 'bar',
                    stop: 1
                })
            })
        })
    })

    describe('array path that exists in object and substraction index to its length is equal than 1', function () {
        context('given { bar: 3 } and [\'foo\', \'bar\'] with index 1', function () {
            it('returns correct reference', function () {
                var obj = {
                    bar: 3
                }
                expect(accessor(obj, ['foo', 'bar'], 1)).to.be.deep.equal({
                    parent: obj,
                    key: 'bar',
                    stop: 1
                })
            })
        })
    })

    describe('array path that middle key does not exist in object', function () {
        context('given { foo: { bup: 3 } } and [\'foo\', \'bar\', \'buzz\'] and index 0', function () {
            it('returns correct reference', function () {
                var obj = {
                    foo: {
                        bup: 3
                    }
                }
                expect(accessor(obj, ['foo', 'bar', 'buzz'], 0)).to.be.deep.equal({
                    parent: obj.foo,
                    key: 'bar',
                    stop: 1
                })
            })
        })
    })

    describe('array path where all key exists in object but the last.', function () {
        context('given { foo: { bup: 3 } } and [\'foo\', \'bar\'] and index 0', function () {
            it('returns correct reference', function () {
                var obj = {
                    foo: {
                        bup: 3
                    }
                }
                expect(accessor(obj, ['foo', 'bar'], 0)).to.be.deep.equal({
                    parent: obj.foo,
                    key: 'bar',
                    stop: 1
                })
            })
        })
    })

    describe('array path with empty object.', function () {
        context('given {} and [\'foo\', \'bar\'] and index 0', function () {
            it('returns correct reference', function () {
                expect(accessor({}, ['foo', 'bar'], 0)).to.be.deep.equal({
                    parent: {},
                    key: 'foo',
                    stop: 0
                })
            })
        })
    })

    describe('empty array path with object.', function () {
        context('given { foo: { bup: 3 } } and [] and index 0', function () {
            it('returns correct reference', function () {
                var obj = {
                    foo: {
                        bup: 3
                    }
                }
                expect(accessor(obj, [], 0)).to.be.deep.equal({
                    parent: obj,
                    key: undefined,
                    stop: 0
                })
            })
        })
    })
})
