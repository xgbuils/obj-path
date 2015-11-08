var expect = require('chai').expect
var parser = require('../../')

describe('parser', function () {
    context('given "foo.bar"', function () {
        it('returns ["foo", "bar"]', function () {
            expect(parser('foo.bar')).to.be.deep.equal(['foo', 'bar'])
        })
    })
    context('given "foo["bar"]"', function () {
        it('returns ["foo", "bar"]', function () {
            expect(parser('foo["bar"]')).to.be.deep.equal(['foo', 'bar'])
        })
    })
    context('given "foo[""]"', function () {
        it('returns ["foo", ""]', function () {
            expect(parser('foo[""]')).to.be.deep.equal(['foo', ''])
        })
    })
    context('given "foo[23]"', function () {
        it('returns ["foo", 23]', function () {
            expect(parser('foo[23]')).to.be.deep.equal(['foo', 23])
        })
    })
    context('given "foo[]"', function () {
        it('returns undefined', function () {
            expect(parser('foo[]')).to.be.equal(undefined)
        })
    })
    context('given "foo[bar]"', function () {
        it('returns undefined', function () {
            expect(parser('foo[bar]')).to.be.equal(undefined)
        })
    })
    context('given "["bar"]foo"', function () {
        it('returns undefined', function () {
            expect(parser('["bar"]foo')).to.be.equal(undefined)
        })
    })
    context('given "["bar"].foo"', function () {
        it('returns ["bar", "foo"]', function () {
            expect(parser('["bar"].foo')).to.be.deep.equal(['bar', 'foo'])
        })
    })
    context('given "["bar"].foo"', function () {
        it('returns ["bar", "foo"]', function () {
            expect(parser('["bar"].foo')).to.be.deep.equal(['bar', 'foo'])
        })
    })
    context('given "[""].foo"', function () {
        it('returns ["", "foo"]', function () {
            expect(parser('["bar"].foo')).to.be.deep.equal(['bar', 'foo'])
        })
    })
    context('given "[254].foo"', function () {
        it('returns [254, "foo"]', function () {
            expect(parser('[254].foo')).to.be.deep.equal([254, 'foo'])
        })
    })
    context('given "[254].[23]"', function () {
        it('returns undefined', function () {
            expect(parser('[254].[23]')).to.be.deep.equal(undefined)
        })
    })
    context('given "[254][23]"', function () {
        it('returns [254, 23]', function () {
            expect(parser('[254][23]')).to.be.deep.equal([254, 23])
        })
    })
    context('given ".foo"', function () {
        it('returns undefined', function () {
            expect(parser('.foo')).to.be.deep.equal(undefined)
        })
    })
    context('given "bar..foo"', function () {
        it('returns undefined', function () {
            expect(parser('bar..foo')).to.be.deep.equal(undefined)
        })
    })
    context('given "foo[\'fs[23][""]d\']"', function () {
        it('returns ["foo", "fs[23][\"\"]d"]', function () {
            expect(parser("foo['fs[23][\"\"]d']")).to.be.deep.equal(['foo', 'fs[23][""]d'])
        })
    })
    context('given "fòö_["bár"][""].$fizz[42].ña"', function () {
        it('returns ["fòö_", "bár", "", "$fizz", 42, "ña"]', function () {
            expect(parser('fòö_["bár"][""].$fizz[42].ña')).to.be
                .deep.equal(['fòö_', 'bár', '', '$fizz', 42, 'ña'])
        })
    })
})