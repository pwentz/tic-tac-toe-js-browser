const ScoreCalculator = require('./scoreCalculator')

module.exports = class Computer {
  constructor(marker) {
    this.marker = marker
  }

  getMove(game) {
    const { board } = game
    const scoresByOpenPosition = board.openSpaces.map(opening => {
      const calculator = new ScoreCalculator(board.state, opening, this.marker, 0)
      calculator.calculateScore(game)
      return calculator
    })

    if (scoresByOpenPosition.every(s => s.score === 0)) {
      scoresByOpenPosition.forEach((s) => {
        s.calculateForks(game)
      })
    }

    const sortedScores = scoresByOpenPosition.sort((a,b) => b.score > a.score)
    const topPosition = sortedScores[0]
    const topMatchingScores = sortedScores.filter(i => i.score === topPosition.score)

    const isCenterOpen = board.openSpaces.includes(4)
    const areTopScoresEqual = topMatchingScores.length > 1

    if (areTopScoresEqual && isCenterOpen) {
      return 4
    }

    return topPosition.position
  }
}
