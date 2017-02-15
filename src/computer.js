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

    const sortedScores = potentialGameScenarios.sort((a,b) => b.score > a.score)
    const topPositionByScore = sortedScores.shift()
    const isBestPositionUnclear = sortedScores.some(i => i.score === topPositionByScore.score)

    const { center } = board.dimensions
    const isCenterOpen = board.isOpen(center)

    if (isBestPositionUnclear && isCenterOpen) {
      return center
    }

    return topPositionByScore.position
  }
}
