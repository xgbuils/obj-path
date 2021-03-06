var sinon = require('sinon')
var expect = require('chai').expect
var mutator = require('../../src/core/mutator')

describe('mutator', function () {
    var cb
    beforeEach(function () {
        cb = sinon.spy()
    })

    describe('with string keys that first key does not exist in object', function () {
        it('returns correct reference', function () {
            var obj = {
                bup: 3
            }
            mutator(obj, ['foo', 'bar', 0, 'fizz', 'buzz'], true, cb)
            expect(obj).to.be.deep.equal({
                bup: 3,
                foo: {
                    bar: [
                        {
                            fizz: {}
                        }
                    ]
                }
            })
            expect(cb.withArgs(obj.foo.bar[0].fizz, 'buzz', undefined, false, 4).calledOnce).to.be.equal(true)
        })
    })

    describe('with string keys that key distinct to first does not exist in object', function () {
        it('returns correct reference', function () {
            var obj = {
                foo: {
                    bar: [
                        {
                            fizz: {}
                        }
                    ]
                }
            }
            mutator(obj, ['foo', 'buzz', 0], true, cb, 0)
            expect(cb.withArgs(obj.foo.buzz, 0, obj.foo.buzz[0], false, 2).calledOnce).to.be.equal(true)
            expect(obj).to.be.deep.equal({
                foo: {
                    bar: [
                        {
                            fizz: {}
                        }
                    ],
                    buzz: []
                }
            })
        })
    })

    describe('with string keys that exists in object', function () {
        it('returns correct reference', function () {
            var obj = {
                bup: 3,
                foo: {
                    bar: [
                        {
                            fizz: {}
                        }
                    ]
                }
            }
            mutator(obj, ['foo', 'bar', 0], true, cb)
            expect(cb.withArgs(obj.foo.bar, 0, obj.foo.bar[0], true, 2).calledOnce).to.be.equal(true)
            expect(obj).to.be.deep.equal({
                bup: 3,
                foo: {
                    bar: [
                        {
                            fizz: {}
                        }
                    ]
                }
            })
        })
    })

    describe('when object is null', function () {
        it('does not set anything and callback is not called', function () {
            var obj = null
            expect(mutator(obj, ['bar', 'fizz'], true, cb, 0)).to.be.deep.equal(undefined)
            expect(cb.called).to.be.equal(false)
            expect(obj).to.be.equal(null)
        })
    })
})
