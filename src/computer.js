const GameScenario = require('./gameScenario')
const { sortByScore } = require('./util')

module.exports = class Computer {
  constructor(marker) {
    this.marker = marker
  }

  scenariosByOpening(game) {
    const { board } = game

    return board.openSpaces.map(indexOfOpenSpace => {
      const scenario = new GameScenario(board.state, indexOfOpenSpace, this.marker, 0)
      scenario.calculateScore(game)
      return scenario
    })
  }

  getMove(game) {
    const { board } = game

    const possibleScenarios = this.scenariosByOpening(game)

    const areThereNoWinners = possibleScenarios.every(s => s.score === 0)

    if (areThereNoWinners) {
      possibleScenarios.forEach((s) => {
        s.calculateForks(game)
      })
    }

    const scenariosByTopScore = sortByScore(possibleScenarios)
    const highestScoringScenario = scenariosByTopScore[0]
    const restOfPositionsByScore = scenariosByTopScore.filter(i => i.score === highestScoringScenario.score)

    const isBestPositionUnclear = restOfPositionsByScore.length > 1

    const { center } = board.dimensions
    const isCenterOpen = board.isOpen(center)

    if (isBestPositionUnclear && isCenterOpen) {
      return center
    }

    return highestScoringScenario.position
  }
}
