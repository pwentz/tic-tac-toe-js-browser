module.exports = class Outcome {
  constructor({ marker }) {
    this.marker = marker
  }

  get didWin() {
    return this.marker &&
            (this.constructor.name === 'FinalOutcome')
  }
}
