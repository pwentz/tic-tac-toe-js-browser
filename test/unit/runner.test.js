const assert = require('chai').assert
const Runner = require('../../src/runner')
const Computer = require('../../src/computer')

const MockUI = class {
  setup() {
    return true
  }

  drawTurn(marker, position) {
    if (marker && position) {
      return {
        marker,
        position
      }
    }

    return false
  }

  onGameOver(positions) {
    return positions ? positions : false
  }

  onReplay() {
    return true
  }
}

describe('#runner', () => {
  const ui = new MockUI()
  it('gets created with a UI element', () => {
    const runner = new Runner({ ui })

    assert.equal(runner.ui, ui)
  })

  it('can get created with a cpu element', () => {
    const cpu = new Computer('X')
    const runner = new Runner({ })
  })
})
