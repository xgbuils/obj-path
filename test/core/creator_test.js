var sinon = require('sinon')
var expect = require('chai').expect
var creator = require('../../src/core/creator')

describe('creator', function () {
    var cb
    beforeEach(function () {
        cb = sinon.spy()
    })

    describe('with integer keys create news arrays', function () {
        it('returns correct reference', function () {
            var obj = {
                bup: 3
            }
            creator(obj, ['bar', 0], cb, 0)
            expect(cb.withArgs([], 0, undefined).calledOnce).to.be.equal(true)
            expect(obj).to.be.deep.equal({
                bup: 3,
                bar: []
            })
        })
    })

    describe('with string keys it creates news objects', function () {
        it('returns correct reference', function () {
            var obj = {
                bup: 3
            }
            creator(obj, ['bar', 'fizz'], cb, 0)
            expect(cb.withArgs({}, 'fizz', undefined).calledOnce).to.be.equal(true)
            expect(obj).to.be.deep.equal({
                bup: 3,
                bar: {}
            })
        })
    })
})
