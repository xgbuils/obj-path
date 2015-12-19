var sinon = require('sinon')
var expect = require('chai').expect
var accessor = require('../../src/core/accessor')

describe('accessor', function () {
    var cb
    beforeEach(function () {
        cb = sinon.spy()
    })

    describe('array path that exists in object and such length is greater than 1', function () {
        context('given { foo: { bar: 3 } } and [\'foo\', \'bar\'] with index 0', function () {
            it('returns correct reference', function () {
                var obj = {
                    foo: {
                        bar: 3
                    }
                }
                accessor(obj, ['foo', 'bar'], 0, cb)
                expect(cb.withArgs(obj.foo, 'bar', 3, 1).calledOnce).to.be.equal(true)
            })
        })
    })

    describe('array path that exists in object and substraction index to its length is equal than 1', function () {
        context('given { bar: 3 } and [\'foo\', \'bar\'] with index 1', function () {
            it('returns correct reference', function () {
                var obj = {
                    bar: 3
                }
                accessor(obj, ['foo', 'bar'], 1, cb)
                expect(cb.withArgs(obj, 'bar', 3, 1).calledOnce).to.be.equal(true)
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
                accessor(obj, ['foo', 'bar', 'buzz'], 0, cb)
                expect(cb.withArgs(obj.foo, 'bar', undefined, 1).calledOnce).to.be.equal(true)
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
                accessor(obj, ['foo', 'bar'], 0, cb)
                expect(cb.withArgs(obj.foo, 'bar', undefined, 1).calledOnce).to.be.equal(true)
            })
        })
    })

    describe('array path with empty object.', function () {
        context('given {} and [\'foo\', \'bar\'] and index 0', function () {
            it('returns correct reference', function () {
                var obj = {}
                accessor(obj, ['foo', 'bar'], 0, cb)
                expect(cb.withArgs(obj, 'foo', undefined, 0).calledOnce).to.be.equal(true)
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
                accessor(obj, [], 0, cb)
                expect(cb.withArgs(obj, undefined, undefined, 0).calledOnce).to.be.equal(true)
            })
        })
    })

    describe('when object is undefined', function () {
        it('calls callback with correct arguments', function () {
            var obj
            accessor(obj, ['foo', 'bar'], 0, cb)
            expect(cb.called).to.be.equal(false)
        })
    })
})
