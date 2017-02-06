const ScoreCalculator = require('./scoreCalculator')
const BoardParser = require('./boardParser')

module.exports = class Computer {
  constructor(marker) {
    this.marker = marker
  }

  parser(board) {
    return new BoardParser(board)
  }

  getMove(board) {
    const openings = this.parser(board).getIndex(' ')
    const options = openings.map(opening => {
      const calculator = new ScoreCalculator(board, opening, this.marker)
      calculator.calculateScore()
      return { position: opening, score: calculator.score }
    })

    if (options.every(opt => opt.score > 0)) {
      const best = options.sort((a, b) => Math.abs(a.score) > Math.abs(b.score))[0]
      return best.position
    }
    else {
      const best = options.sort((a, b) => b.score > a.score)[0]
      return best.position
    }
  }
}
