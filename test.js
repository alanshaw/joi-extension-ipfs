const test = require('tape')
const Joi = require('joi').extend(require('./'))

test('should validate an IPFS path correctly', (t) => {
  t.plan(2)

  const input = '/ipfs/QmWPgGoxjsSazq94f3dvysj17d4pbebqamfMmVXn2DqkG9'
  const schema = Joi.ipfs().path()
  const result = schema.validate(input)

  t.ifError(result.error, 'no error validating a valid path')
  t.equal(result.value, input, 'value was correct')

  t.end()
})

test('should validate an invalid IPFS path correctly', (t) => {
  t.plan(1)

  const input = 'NOT AN IPFS PATH'
  const schema = Joi.ipfs().path()
  const result = schema.validate(input)

  t.ok(result.error, 'expected error validating path')

  t.end()
})

test('should validate a too short multihash correctly', (t) => {
  t.plan(1)

  const input = '/ipfs/g'
  const schema = Joi.ipfs().path()
  const result = schema.validate(input)

  t.ok(result.error, 'expected error validating multihash')

  t.end()
})

test('should validate a too long multihash correctly', (t) => {
  t.plan(1)

  const input = '/ipfs/QmWPgGoxjsSazq94f3dvysj17d4pbebqamfMmVXn2DqkG9QmWPgGoxjsSazq94f3dvysj17d4pbebqamfMmVXn2DqkG9'
  const schema = Joi.ipfs().path()
  const result = schema.validate(input)

  t.ok(result.error, 'expected error validating multihash')

  t.end()
})

test('should validate a multihash only path', (t) => {
  t.plan(2)

  const input = 'QmWPgGoxjsSazq94f3dvysj17d4pbebqamfMmVXn2DqkG9'
  const schema = Joi.ipfs().path()
  const result = schema.validate(input)

  t.ifError(result.error, 'no error validating a multihash path')
  t.equal(result.value, '/ipfs/' + input, 'value was correct')

  t.end()
})

test('should validate an IPFS path missing leading forward slash', (t) => {
  t.plan(2)

  const input = 'ipfs/QmWPgGoxjsSazq94f3dvysj17d4pbebqamfMmVXn2DqkG9'
  const schema = Joi.ipfs().path()
  const result = schema.validate(input)

  t.ifError(result.error, 'no error validating a path')
  t.equal(result.value, '/' + input, 'value was correct')

  t.end()
})

test('should validate an IPFS path missing protocol', (t) => {
  t.plan(2)

  const input = 'QmWPgGoxjsSazq94f3dvysj17d4pbebqamfMmVXn2DqkG9/foo.jpg'
  const schema = Joi.ipfs().path()
  const result = schema.validate(input)

  t.ifError(result.error, 'no error validating a path')
  t.equal(result.value, '/ipfs/' + input, 'value was correct')

  t.end()
})

test('should validate an IPFS path strictly', (t) => {
  const inputs = [
    // No multihash only
    'QmWPgGoxjsSazq94f3dvysj17d4pbebqamfMmVXn2DqkG9',
    // No missing proto
    'QmWPgGoxjsSazq94f3dvysj17d4pbebqamfMmVXn2DqkG9/foo.jpg',
    // No missing leading forward slash
    'ipns/QmWPgGoxjsSazq94f3dvysj17d4pbebqamfMmVXn2DqkG9',
    // No invalid hash
    '/ipfs/ggg'
  ]

  t.plan(inputs.length)

  const schema = Joi.ipfs().path({ strict: true })

  inputs.forEach((input) => {
    const result = schema.validate(input)
    t.ok(result.error, 'expected error validating path')
  })

  t.end()
})
