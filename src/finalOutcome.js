const Outcome = require('./outcome')

module.exports = class FinalOutcome extends Outcome {
  constructor({ marker, positions }) {
    super({ marker })
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
