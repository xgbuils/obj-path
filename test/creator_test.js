var expect = require('chai').expect
var creator = require('../src/creator')

describe('creator', function () {
    describe('with integer keys create news arrays', function () {
        it('returns correct reference', function () {
            var obj = {
                bup: 3
            }
            var result = creator(obj, ['bar', 0], 0, 5)
            expect(obj).to.be.deep.equal({
                bup: 3,
                bar: []
            })
            expect(result).to.be.deep.equal({
                parent: [],
                key: 0
            })
        })
    })

    describe('with string keys it creates news objects', function () {
        it('returns correct reference', function () {
            var obj = {
                bup: 3
            }
            var result = creator(obj, ['bar', 'fizz'], 0, 2)
            expect(obj).to.be.deep.equal({
                bup: 3,
                bar: {}
            })
            expect(result).to.be.deep.equal({
                parent: {},
                key: 'fizz'
            })
        })
    })
})
