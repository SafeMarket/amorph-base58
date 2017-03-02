const Nobject = require('nobject')
const base58Coder = require('bs58')
const arrayEquals = require('array-equal')

const converters = new Nobject

converters.set(['base58', 'buffer'], (base58) => {
  return base58Coder.decode(base58)
})

converters.set(['buffer', 'base58'], (buffer) => {
  return base58Coder.encode(buffer)
})

module.exports = {
  pluginVersion: 1,
  converters: converters,
  equivalenceTests: {
    uint8Array: arrayEquals,
    array: arrayEquals
  }
}
