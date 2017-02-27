const assert = require('chai').assert
const FinalOutcome = require('../../src/finalOutcome')

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
})
