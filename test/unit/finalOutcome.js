const assert = require('chai').assert
const FinalOutcome = require('../../src/finalOutcome')
const Outcome = require('../../src/outcome')

describe('FinalOutcome', () => {
  it('has a winningPositions attribute', () => {
    const marker = 'X'
    const positions = [1, 2, 3]

    const outcome = new FinalOutcome({ marker, positions })

    assert.deepEqual(outcome.positions, positions)
  })

  it('has a marker attribute', () => {
    const marker = 'X'
    const positions = []

    const outcome = new FinalOutcome({ marker, positions })

    assert.equal(outcome.marker, marker)
  })

  it('inherits from Outcome', () => {
    const marker = 'X'
    const positions = []

    const finalOutcome = new FinalOutcome({ marker, positions })

    assert.equal(finalOutcome.__proto__.__proto__.constructor, Outcome)
  })
})
