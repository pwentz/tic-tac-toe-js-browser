const assert = require('chai').assert
const runner = require('../../src/runner')
const Computer = require('../../src/computer')

const MockUI = class {
  setup() {
    return true
  }

  promptUserForTurn(callback) {
    callback()
  }

  drawMarkerOne(marker, selection) {
    return {
      marker, selection
    }
  }

  drawMarkerTwo(marker, selection) {
    return {
      marker, selection
    }
  }

  onGameOver(positions) {
    return positions ? positions : false
  }

  logWarning(warning) {
    return warning
  }

  getMarkerSettings(callback) {
    callback()
  }

  getOrderSettings(callback) {
    callback()
  }

  renderBoard() {
    return true
  }
}

describe('#runner', () => {
  const ui = new MockUI()
  describe('#setup', () => {
  })
})
