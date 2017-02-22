const FinalOutcome = require('./finalOutcome')
const ActionableOutcome = require('./actionableOutcome')
const NullOutcome = require('./nullOutcome')
const MarkerFinder = require('./markerFinder')

module.exports = class OutcomeFactory {
  constructor(board) {
    this.finder = new MarkerFinder(board)
    this.outcomes = []
  }

  getOutcome(marker) {
    if (this.finder.isBoardFull()) {
      return new FinalOutcome({ marker: null, positions: [] })
    }

    const onGameOver = (options) => {
      this.outcomes.push(new FinalOutcome(options))
    }

    const onWinningSetup = (options) => {
      this.outcomes.push(new ActionableOutcome(options))
    }

    this.finder.findMarker(marker, onGameOver, onWinningSetup)

    const finalOutcome = this.outcomes.find(o => o.isOver)

    if (finalOutcome) {
      return finalOutcome
    }

    const actionableOutcome = this.outcomes.find(o => o.willWin)

    if (actionableOutcome) {
      return actionableOutcome
    }

    return new NullOutcome({ marker })
  }
}
