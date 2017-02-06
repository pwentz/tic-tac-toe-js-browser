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

  parser(board) {
    return new BoardParser(board)
  }

  get outcome() {
    return Outcome
  }

  calculateScore() {
    if (this.outcome.didWin(this.board.state, this.marker)) {
      this.score += 10
      return;
    }
    else {
      const oppoMarker = this.opposingSymbols[this.marker]
      const forks = this.board.forks(oppoMarker)
      const didOpponentWin = forks.some(fork => {
        return this.outcome.didWin(fork.state, oppoMarker)
      })

      if (didOpponentWin) {
        this.score += -10
        return;
      }

      else {
        forks.forEach(fork => {
          const openings = this.parser(fork.state).getIndex(' ')
          openings.forEach(opening => {
            const newCalc = new this.constructor(fork.state, opening, this.marker)
            newCalc.calculateScore()
            this.score += newCalc.score
          })
        })
      }
    }
  }
}
