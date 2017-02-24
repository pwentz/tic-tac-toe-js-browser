const assert = require('chai').assert
const Outcome = require('../../src/outcome')

describe('Outcome', () => {
  it('has a marker attribute', () => {
    const marker = 'X'

    const outcome = new Outcome({ marker })

    assert.equal(outcome.marker, marker)
  })
})
