const chai = require('chai')
const expect = chai.expect
const plugin = require('../')
const converters = plugin.converters
const Nobject = require('nobject')

chai.should()

//examples from https://www.npmjs.com/package/bs58
const array = [0,60,23,110,101,155,234,15,41,163,233,191,120,128,193,18,177,179,27,77,200,38,38,129,135]
const base58 = '16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS'

describe('converters', () => {

  it('should be instance of Nobject', () => {
    expect(converters).to.be.instanceOf(Nobject)
  })

  describe('base58-array', () => {
    it('test 1', () => {
      const uint8array = converters.get('base58', 'array')(base58)
      expect(uint8array).to.be.instanceOf(Array)
      expect(uint8array).to.deep.equal(array)
    })
  })

  describe('array-uint8Array', () => {
    it('test 1', () => {
      const uint8array = converters.get('array', 'uint8Array')(array)
      expect(uint8array).to.be.instanceOf(Uint8Array)
      expect(uint8array).to.deep.equal(new Uint8Array(array))
    })
  })

  describe('uint8array-base58', () => {
    it('test 1', () => {
      const hex = converters.get('uint8Array', 'base58')(array)
      expect(hex).to.be.a.string
      expect(hex).to.equal(base58)
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
