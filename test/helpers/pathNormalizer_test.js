var expect = require('chai').expect
var pathNormalizer = require('../../src/helpers/pathNormalizer')

describe('pathNormalizer', function () {
    context('given "foo.bar"', function () {
        it('returns ["foo", "bar"]', function () {
            expect(pathNormalizer('foo.bar')).to.be.deep.equal(['foo', 'bar'])
        })
    })
    context('given [\'foo\', \'bar\']', function () {
        it('returns [\'foo\', \'bar\']', function () {
            expect(pathNormalizer(['foo', 'bar'])).to.be.deep.equal(['foo', 'bar'])
        })
    })
    context('given number', function () {
        it('returns [23]', function () {
            expect(pathNormalizer(23)).to.be.deep.equal([23])
        })
    })
    context('given object', function () {
        it('throws Error', function () {
            expect(function () {
                pathNormalizer({})
            }).to.Throw('[object Object] is not correct string path')
        })
    })
    context('given null', function () {
        it('returns empty array', function () {
            expect(pathNormalizer(null)).to.be.deep.equal([])
        })
    })
    context('given undefined', function () {
        it('returns empty array', function () {
            expect(pathNormalizer(undefined)).to.be.deep.equal([])
        })
    })
    context('given 0', function () {
        it('returns [0]', function () {
            expect(pathNormalizer(0)).to.be.deep.equal([0])
        })
    })
    context('given empty string', function () {
        it('returns [\'\']', function () {
            expect(pathNormalizer('')).to.be.deep.equal([''])
        })
    })
})
