const FinalOutcome = require('./finalOutcome')
const NullOutcome = require('./nullOutcome')
const MarkerFinder = require('./markerFinder')

module.exports = class OutcomeFactory {
  constructor(board) {
    this.finder = new MarkerFinder(board)
    this.outcomes = []
  }

  getOutcome(marker) {
    const onGameOver = (options) => {
      this.outcomes.push(new FinalOutcome(options))
    }

    const onWinningSetup = () => {
      const actionableOutcome = {
        marker,
        didWin: false,
        willWin: true,
        isOver: false,
        positions: []
      }

      this.outcomes.push(actionableOutcome)
    }

    this.finder.findMarker(marker, onGameOver, onWinningSetup)

    const finalOutcome = this.outcomes.find(o => o.isOver)

    if (finalOutcome) {
      return finalOutcome
    }

    const actionableOutcome = this.outcomes.find(o => o.willWin)

    if (this.finder.isBoardFull()) {
      return new FinalOutcome({ marker: null, positions: [] })
    }

    if (actionableOutcome) {
      return actionableOutcome
    }

    return new NullOutcome({ marker })
  }
}
