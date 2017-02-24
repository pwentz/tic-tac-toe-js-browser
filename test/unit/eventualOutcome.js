const assert = require('chai').assert
const Outcome = require('../../src/outcome')
const ActionableOutcome = require('../../src/actionableOutcome')

describe('ActionableOutcome', () => {
  const marker = 'X'
  const position = 1
  const actionableOutcome = new ActionableOutcome({ marker, position })

  it('takes a marker attribute', () => {
    assert.equal(actionableOutcome.marker, marker)
  })

  it('takes a position attribute', () => {
    assert.equal(actionableOutcome.position, position)
  })

  it('inherits from Outcome', () => {
    assert.equal(actionableOutcome.__proto__.__proto__.constructor, Outcome)
  })
})
