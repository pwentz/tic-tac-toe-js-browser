const Outcome = require('./outcome')

module.exports = class ActionableOutcome extends Outcome {
  constructor({ marker, position }) {
    super({ marker })
    this.position = position
  }
}
