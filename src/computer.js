const R = require('ramda')
const GameScenario = require('./gameScenario')

module.exports = class Computer {
  constructor(marker) {
    this.marker = marker
  }

  getMove(game) {
    const { board } = game
    const potentialGameScenarios = board.openSpaces.map(indexOfOpenSpace => {
      const scenario = new GameScenario(board.state, indexOfOpenSpace, this.marker, 0)
      scenario.calculateScore(game)
      return scenario
    })

    const areThereNoWinners = potentialGameScenarios.every(s => s.score === 0)

    if (areThereNoWinners) {
      potentialGameScenarios.forEach((s) => {
        s.calculateForks(game)
      })
    }

    const sortByScore = R.sortBy(R.prop('score'))

    const sortedScores = sortByScore(potentialGameScenarios)
    const topPositionByScore = sortedScores.slice(-1)[0]
    const isBestPositionUnclear = sortedScores.filter(i => i.score === topPositionByScore.score).length > 1

    const { center } = board.dimensions
    const isCenterOpen = board.isOpen(center)

    if (isBestPositionUnclear && isCenterOpen) {
      return center
    }

    return topPositionByScore.position
  }
}
