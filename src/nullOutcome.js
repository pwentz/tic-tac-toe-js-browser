const Outcome = require('./outcome')

module.exports = class NullOutcome extends Outcome {
  constructor({ marker }) {
    super({ marker })
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
