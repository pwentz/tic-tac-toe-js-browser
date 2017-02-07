const ScoreCalculator = require('./scoreCalculator')

module.exports = class Computer {
  constructor(marker) {
    this.marker = marker
  }

  getMove(board) {
    const scoresByOpenPosition = board.openSpaces.map(opening => {
      const calculator = new ScoreCalculator(board.state, opening, this.marker)
      calculator.calculateScore()
      return { position: opening, score: calculator.score }
    })

    const isLikelyToWin = scoresByOpenPosition.every(i => i.score > 0)

    if (isLikelyToWin) {
      const bestOptions = scoresByOpenPosition.sort(this.byClosestToZero)
      return bestOptions[0].position
    }

    const bestOptions = scoresByOpenPosition.sort(this.byHighestScore)
    return bestOptions[0].position
  }

  byClosestToZero(a, b) {
    return Math.abs(a.score) > Math.abs(b.score)
  }

  byHighestScore(a, b) {
    return b.score > a.score
  }
}
