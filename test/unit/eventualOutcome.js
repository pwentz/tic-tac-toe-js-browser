const assert = require('chai').assert
const Outcome = require('../../src/outcome')
const EventualOutcome = require('../../src/eventualOutcome')

describe('EventualOutcome', () => {
  const marker = 'X'
  const position = 1
  const eventualOutcome = new EventualOutcome({ marker, position })

  it('takes a marker attribute', () => {
    assert.equal(eventualOutcome.marker, marker)
  })

  it('takes a position attribute', () => {
    assert.equal(eventualOutcome.position, position)
  })

  it('inherits from Outcome', () => {
    assert.equal(eventualOutcome.__proto__.__proto__.constructor, Outcome)
  })
})
