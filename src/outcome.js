module.exports = class Outcome {
  constructor({ marker }) {
    this.marker = marker
  }

  get didWin() {
    return this.marker &&
            (this.constructor.name === 'FinalOutcome')
  }

  get willWin() {
    return this.constructor.name === 'EventualOutcome'
  }

  get isOver() {
    return this.constructor.name === 'FinalOutcome'
  }
}
