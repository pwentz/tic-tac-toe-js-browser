const Outcome = require('./outcome')

module.exports = class FinalOutcome extends Outcome {
  constructor({ marker, positions }) {
    super({ marker })
    this.positions = positions
  }
}
