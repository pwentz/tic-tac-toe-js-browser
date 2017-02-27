module.exports = class FinalOutcome {
  constructor({ marker, positions }) {
    this.marker = marker
    this.positions = positions
  }

  get didWin() {
    if (this.marker) {
      return true
    }

    return false
  }

  get willWin() {
    return false
  }

  get isOver() {
    return true
  }
}
