var expect = require('chai').expect
var getToken = require('../../src/parser/getToken')

describe('getToken', function () {
    describe('identifier in beginning of string', function () {
        context('given "foo.bar["asd"]a[3][\'jeje\']" and index 0', function () {
            it('returns token.value \'foo\'', function () {
                expect(getToken('foo.bar["asd"]a[3][\'jeje\']', 0)).to.be.deep.equal({
                    value: 'foo',
                    next: 3
                })
            })
        })
    })
    describe('point expression starting with point character in middle of string', function () {
        context('given "foo.bar["asd"]a[3][\'jeje\']" and index 3', function () {
            it('returns token.value \'bar\'', function () {
                expect(getToken('foo.bar["asd"]a[3][\'jeje\']', 3)).to.be.deep.equal({
                    value: 'bar',
                    next: 7
                })
            })
        })
    })
    describe('bracket expression with double quoted string', function () {
        context('given "foo.bar["asd"]a[3][\'jeje\']" and index 7', function () {
            it('returns token.value \'asd\'', function () {
                expect(getToken('foo.bar["asd"]a[3][\'jeje\']', 7)).to.be.deep.equal({
                    value: 'asd',
                    next: 14
                })
            })
        })
    })
    describe('identidier that does not start with point character in middle of string', function () {
        context('given "foo.bar["asd"]a[3][\'jeje\']" and index 14', function () {
            it('throws an Error', function () {
                expect(function () {
                    getToken('foo.bar["asd"]a[3][\'jeje\']', 14)
                }).to.Throw(Error)
            })
        })
    })
    describe('bracket expression with integer', function () {
        context('given "foo.bar["asd"]a[3][\'jeje\']" and index 15', function () {
            it('returns token.value 3', function () {
                expect(getToken('foo.bar["asd"]a[3][\'jeje\']', 15)).to.be.deep.equal({
                    value: 3,
                    next: 18
                })
            })
        })
    })
    describe('bracket expression with simple quoted string', function () {
        context('given "foo.bar["asd"]a[3][\'jeje\']" and index 18', function () {
            it('returns token.value \'jeje\'', function () {
                expect(getToken('foo.bar["asd"]a[3][\'jeje\']', 18)).to.be.deep.equal({
                    value: 'jeje',
                    next: 26
                })
            })
        })
    })
    describe('point expression in beginning of string', function () {
        context('given ".foo..çdt["as\\"d"][3a][\'j]e\\\']je\'][][""]" and index 0', function () {
            it('throws an Error', function () {
                expect(function () {
                    getToken('.foo..çdt["as\\"d"][3a][\'j]e\\\']je\'][][""]', 0)
                }).to.Throw(Error)
            })
        })
    })
    describe('point expression with nothing', function () {
        context('given ".foo..çdt["as\\"d"][3a][\'j]e\\\']je\'][][""]" and index 5', function () {
            it('throws an Error', function () {
                expect(function () {
                    getToken('.foo..çdt["as\\"d"][3a][\'j]e\\\']je\'][][""]', 4)
                }).to.Throw(Error)
            })
        })
    })
    describe('point expression with strange characters', function () {
        context('given ".foo..çdt["as\\"d"][3a][\'j]e\\\']je\'][][""]" and index 5', function () {
            it('returns token.value \'çdt\'', function () {
                expect(getToken('.foo..çdt["as\\"d"][3a][\'j]e\\\']je\'][][""]', 5)).to.be.deep.equal({
                    value: 'çdt',
                    next: 9
                })
            })
        })
    })
    describe('bracket expression with double quoted string with escaped characters', function () {
        context('given ".foo..çdt["as\\"d"][3a][\'j]e\\\']je\'][][""]" and index 9', function () {
            it('returns token.value \'as"d\'', function () {
                expect(getToken('.foo..çdt["as\\"d"][3a][\'j]e\\\']je\'][][""]', 9)).to.be.deep.equal({
                    value: 'as"d',
                    next: 18
                })
            })
        })
    })
    describe('bracket expression with bad integer expression', function () {
        context('given ".foo..çdt["as\\"d"][3a][\'j]e\\\']je\'][][""]" and index 18', function () {
            it('throws an Error', function () {
                expect(function () {
                    getToken('.foo..çdt["as\\"d"][3a][\'j]e\\\']je\'][][""]', 18)
                }).to.Throw(Error)
            })
        })
    })
    describe('bracket expression with simple quote string with escaped characters', function () {
        context('given ".foo..çdt["as\\"d"][3a][\'j]e\\\']je\'][][""]" and index 22', function () {
            it('returns token.value \'j]e\\\']je\'', function () {
                expect(getToken('.foo..çdt["as\\"d"][3a][\'j]e\\\']je\'][][""]', 22)).to.be.deep.equal({
                    value: 'j]e\']je',
                    next: 34
                })
            })
        })
    })
    describe('bracket expression with nothing', function () {
        context('given ".foo..çdt["as\\"d"][3a][\'j]e\\\']je\'][][""]" and index 34', function () {
            it('throws an Error', function () {
                expect(function () {
                    getToken('.foo..çdt["as\\"d"][3a][\'j]e\\\']je\'][][""]', 34)
                }).to.Throw(Error)
            })
        })
    })
    describe('bracket expression with empty string', function () {
        context('given ".foo..çdt["as\\"d"][3a][\'j]e\\\']je\'][][""]" and index 36', function () {
            it('returns token.value \'\'', function () {
                expect(getToken('.foo..çdt["as\\"d"][3a][\'j]e\\\']je\'][][""]', 36)).to.be.deep.equal({
                    value: '',
                    next: 40
                })
            })
        })
    })
    describe('index is equal than string length', function () {
        context('given ".foo.bar', function () {
            it('returns null', function () {
                expect(getToken('.foo.bar', 8)).to.be.equal(null)
            })
        })
    })
    describe('index is greater than string length', function () {
        context('given ".foo.bar', function () {
            it('returns null', function () {
                expect(getToken('.foo.bar', 50)).to.be.equal(null)
            })
        })
    })
})
