const ScoreCalculator = require('./scoreCalculator')
const BoardParser = require('./boardParser')

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

    // if in a good position to win, then most options will be > 0
    // in this case, lower scores indicate a quicker return from calculateMove()
    // and higher score means keeping the game alive (score is tallied by accumulation of forks)
    if (scoresByOpenPosition.every(i => i.score > 0)) {
      const bestOptions = scoresByOpenPosition.sort((a, b) => Math.abs(a.score) > Math.abs(b.score))
      return bestOptions[0].position
    }

    // in regular situations, we want the highest score
    const bestOptions = scoresByOpenPosition.sort((a, b) => b.score > a.score)
    return bestOptions[0].position
  }
}
