var sinon = require('sinon')
var expect = require('chai').expect
var mutator = require('../../src/core/mutator')

describe('mutator', function () {
    var cb
    beforeEach(function () {
        cb = sinon.spy()
    })

    describe('with string keys that do not exist in object', function () {
        it('returns correct reference', function () {
            var obj = {
                bup: 3
            }
            mutator(obj, ['foo', 'bar', 0, 'fizz', 'buzz'], 0, cb)
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
            expect(cb.withArgs(obj.foo.bar[0].fizz, 'buzz').calledOnce).to.be.equal(true)
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
            mutator(obj, ['foo', 'bar', 0], 0, cb)
            expect(cb.withArgs(obj.foo.bar, 0).calledOnce).to.be.equal(true)
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
})
