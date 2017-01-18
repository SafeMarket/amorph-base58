const Nobject = require('nobject')
const base58Coder = require('bs58')
const arrayEquals = require('array-equal')

const converters = new Nobject

converters.set(['base58', 'array'], (base58) => {
  return base58Coder.decode(base58)
})

converters.set(['array', 'uint8Array'], (array) => {
  return new Uint8Array(array)
})

converters.set(['uint8Array', 'base58'], (uint8Array) => {
  return base58Coder.encode(uint8Array)
})

module.exports = {
  pluginVersion: 1,
  converters: converters,
  equivalenceTests: {
    uint8Array: arrayEquals,
    array: arrayEquals
  }
}
