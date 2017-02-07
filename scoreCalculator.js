const { transpose } = require('./util')
const BoardParser = require('./boardParser')
const Board = require('./board')
const Outcome = require('./outcome')

module.exports = class ScoreCalculator {
  constructor(boardState, position, marker) {
    const updatedBoardState = [...boardState]
    updatedBoardState[position] = marker

    this.score = 0
    this.board = new Board(updatedBoardState)
    this.marker = marker
  }

  get opposingSymbols() {
    return {
      'X': 'O',
      'O': 'X'
    }
  }

  get outcome() {
    return Outcome
  }

  calculateScore() {
    if (this.outcome.didWin(this.board, this.marker)) {
      this.score += 10
      return;
    }

    const opposingMarker = this.opposingSymbols[this.marker]
    const forks = this.board.forks(opposingMarker)
    const didOpponentWin = forks.some(fork => {
      return this.outcome.didWin(fork, opposingMarker)
    })

    if (didOpponentWin) {
      this.score += -10
      return;
    }

    forks.forEach(fork => {
      const openings = fork.openSpaces
      openings.forEach(opening => {
        const newCalc = new this.constructor(fork.state, opening, this.marker)
        newCalc.calculateScore()
        this.score += newCalc.score
      })
    })
  }
}
