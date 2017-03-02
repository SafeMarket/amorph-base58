const chai = require('chai')
const expect = chai.expect
const plugin = require('../')
const converters = plugin.converters
const Nobject = require('nobject')

chai.should()

//examples from https://www.npmjs.com/package/bs58
const buffer = Buffer.from([0,60,23,110,101,155,234,15,41,163,233,191,120,128,193,18,177,179,27,77,200,38,38,129,135])
const base58 = '16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS'

describe('converters', () => {

  it('should be instance of Nobject', () => {
    expect(converters).to.be.instanceOf(Nobject)
  })

  describe('base58-buffer', () => {
    it('test 1', () => {
      const _buffer = converters.get('base58', 'buffer')(base58)
      expect(Buffer.compare(buffer, _buffer)).to.equal(0)
    })
  })

  describe('buffer-base58', () => {
    it('test 1', () => {
      const _base58 = converters.get('buffer', 'base58')(buffer)
      expect(_base58).to.be.a.string
      expect(_base58).to.equal(base58)
    })
  })

})

describe('equivalenceTests', () => {

  describe('array', () => {
    const test = plugin.equivalenceTests.array
    it('[] should equal []', () => {
      test([], []).should.equal(true)
    })

    it('[1] should NOT equal []', () => {
      test([1], []).should.equal(false)
    })

    it('[] should NOT equal [1]', () => {
      test([], [1]).should.equal(false)
    })

    it('[1] should equal [1]', () => {
      test([1], [1]).should.equal(true)
    })
  })

  describe('uint8Array', () => {
    const test = plugin.equivalenceTests.uint8Array

    it('should return false when lengths dont match', () => {
      expect(
        test(new Uint8Array([]), new Uint8Array([1]))
      ).to.equal(false)
      expect(
        test(new Uint8Array([1]), new Uint8Array([]))
      ).to.equal(false)
    })

    it('should return false when values dont match', () => {
      expect(
        test(new Uint8Array([0]), new Uint8Array([1]))
      ).to.equal(false)
      expect(
        test(new Uint8Array([1]), new Uint8Array([0]))
      ).to.equal(false)
    })
    it('should return true when values do match', () => {
      expect(
        test(new Uint8Array([1]), new Uint8Array([1]))
      ).to.equal(true)
    })

  })
})
