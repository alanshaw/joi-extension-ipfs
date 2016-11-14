# joi-extension-ipfs [![Build Status](https://travis-ci.org/alanshaw/joi-extension-ipfs.svg?branch=master)](https://travis-ci.org/alanshaw/joi-extension-ipfs) [![dependencies Status](https://david-dm.org/alanshaw/joi-extension-ipfs/status.svg)](https://david-dm.org/alanshaw/joi-extension-ipfs)

Joi validators for IPFS.

## Example

```js
const Joi = require('joi').extend(require('joi-extension-ipfs'))
const Assert = require('assert')

const schema = Joi.ipfs().path()

let result = schema.validate('/ipfs/QmWPgGoxjsSazq94f3dvysj17d4pbebqamfMmVXn2DqkG9')
Assert.ifError(result.error)
console.log(result.value) // /ipfs/QmWPgGoxjsSazq94f3dvysj17d4pbebqamfMmVXn2DqkG9
```

## Strict mode

By default, `joi-extension-ipfs` will validate an IPFS path if it looks like it might be one. Pass `strict: true` to enable strict path validation.

```js
const Joi = require('joi').extend(require('joi-extension-ipfs'))
const Assert = require('assert')

const strictSchema = Joi.ipfs().path({ strict: true })
const schema = Joi.ipfs().path()

// Multihash only

let result = strictSchema.validate('QmWPgGoxjsSazq94f3dvysj17d4pbebqamfMmVXn2DqkG9')
Assert.ifError(result.error) // throws

result = schema.validate('QmWPgGoxjsSazq94f3dvysj17d4pbebqamfMmVXn2DqkG9')
console.log(result.value) // /ipfs/QmWPgGoxjsSazq94f3dvysj17d4pbebqamfMmVXn2DqkG9

// Missing leading forward slash

result = strictSchema.validate('ipfs/QmWPgGoxjsSazq94f3dvysj17d4pbebqamfMmVXn2DqkG9')
Assert.ifError(result.error) // throws

result = schema.validate('ipfs/QmWPgGoxjsSazq94f3dvysj17d4pbebqamfMmVXn2DqkG9')
console.log(result.value) // /ipfs/QmWPgGoxjsSazq94f3dvysj17d4pbebqamfMmVXn2DqkG9

// Missing protocol

result = strictSchema.validate('QmWPgGoxjsSazq94f3dvysj17d4pbebqamfMmVXn2DqkG9/foo.jpg')
Assert.ifError(result.error) // throws

result = schema.validate('QmWPgGoxjsSazq94f3dvysj17d4pbebqamfMmVXn2DqkG9/foo.jpg')
console.log(result.value) // /ipfs/QmWPgGoxjsSazq94f3dvysj17d4pbebqamfMmVXn2DqkG9/foo.jpg
```

## Validate ONLY a multihash?

Take a look at [`joi-extension-multihash`](https://www.npmjs.com/package/joi-extension-multihash).

---

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
