const Outcome = require('./outcome')

module.exports = class NullOutcome extends Outcome {
  constructor({ marker }) {
    super({ marker })
  }
}
