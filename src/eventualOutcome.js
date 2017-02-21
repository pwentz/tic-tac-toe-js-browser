const Outcome = require('./outcome')

module.exports = class EventualOutcome extends Outcome {
  constructor({ marker, position }) {
    super({ marker })
    this.position = position
  }
}
