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
            creator(obj, ['bar', 0], 0, cb)
            expect(cb.withArgs([], 0).calledOnce).to.be.equal(true)
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
            creator(obj, ['bar', 'fizz'], 0, cb)
            expect(cb.withArgs({}, 'fizz').calledOnce).to.be.equal(true)
            expect(obj).to.be.deep.equal({
                bup: 3,
                bar: {}
            })
        })
    })
})
