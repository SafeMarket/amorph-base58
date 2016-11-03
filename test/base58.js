const expect = require('chai').expect
const base58Converters = require('../')
const Nobject = require('nobject')

//examples from https://www.npmjs.com/package/bs58
const array = [0,60,23,110,101,155,234,15,41,163,233,191,120,128,193,18,177,179,27,77,200,38,38,129,135]
const base58 = '16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS'

describe('base58 converters', () => {

  it('should be instance of Nobject', () => {
    expect(base58Converters).to.be.instanceOf(Nobject)
  })

  describe('base58-array', () => {
    it('test 1', () => {
      const uint8array = base58Converters.get('base58', 'array')(base58)
      expect(uint8array).to.be.instanceOf(Array)
      expect(uint8array).to.deep.equal(array)
    })
  })

  describe('array-uint8Array', () => {
    it('test 1', () => {
      const uint8array = base58Converters.get('array', 'uint8Array')(array)
      expect(uint8array).to.be.instanceOf(Uint8Array)
      expect(uint8array).to.deep.equal(new Uint8Array(array))
    })
  })

  describe('uint8array-base58', () => {
    it('test 1', () => {
      const hex = base58Converters.get('uint8Array', 'base58')(array)
      expect(hex).to.be.a.string
      expect(hex).to.equal(base58)
    })
  })

})