module.exports = class NullOutcome {
  constructor({ marker }) {
    this.marker = marker
    this.positions = []
  }

  get didWin() {
    return false
  }

  get willWin() {
    return false
  }

  get isOver() {
    return false
  }
}
