const Nobject = require('nobject')
const base58Coder = require('bs58')
  
const base58Converters = new Nobject
  
base58Converters.set(['base58', 'array'], (base58) => {
  return base58Coder.decode(base58)
})

base58Converters.set(['array', 'uint8Array'], (array) => {
  return new Uint8Array(array)
})

base58Converters.set(['uint8Array', 'base58'], (uint8Array) => {
  return base58Coder.encode(uint8Array)
})

module.exports = base58Converters