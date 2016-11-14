var Joi = require('joi')
var multihashes = require('multihashes')

module.exports = {
  name: 'ipfs',
  language: {
    namespace: 'invalid IPFS namespace',
    multihashShort: 'multihash too short. must be > 3 bytes.',
    multihashLong: 'multihash too long. must be < 129 bytes.',
    multihashCode: 'multihash unknown function code',
    multihashLength: 'multihash length inconsistent',
    multihashBase: 'multihash non-base58 character',
    multihashError: '{{message}}'
  },
  rules: [{
    name: 'path',
    params: {
      options: Joi.object().keys({
        strict: Joi.boolean()
      })
    },
    validate: function (params, value, state, options) {
      value = value + ''

      if (params.options && params.options.strict) {
        if (!/^\/(ipfs|ipns)/.test(value)) {
          return this.createError('ipfs.namespace', { v: value }, state, options)
        }
      } else {
        if (/^\/?(ipfs|ipns)/.test(value)) {
          // Add prefix / if missing
          value = (value[0] !== '/') ? '/' + value : value
        } else {
          // Multihash only, or multihash + rest?
          value = '/ipfs/' + value
        }
      }

      var multihash = value.split('/')[2]

      try {
        multihashes.validate(multihashes.fromB58String(multihash))
      } catch (err) {
        if (err.message.indexOf('too short') > -1) {
          return this.createError('ipfs.multihashShort', { v: value }, state, options)
        } else if (err.message.indexOf('too long') > -1) {
          return this.createError('ipfs.multihashLong', { v: value }, state, options)
        } else if (err.message.indexOf('unknown function code') > -1) {
          return this.createError('ipfs.multihashCode', { v: value }, state, options)
        } else if (err.message.indexOf('length inconsistent') > -1) {
          return this.createError('ipfs.multihashLength', { v: value }, state, options)
        } else if (err.message.indexOf('Non-base') > -1) {
          return this.createError('ipfs.multihashBase', { v: value }, state, options)
        } else {
          return this.createError('ipfs.multihashError', { v: value, message: err.message }, state, options)
        }
      }

      return value
    }
  }]
}
