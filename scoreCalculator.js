const Board = require('./board')
const Outcome = require('./outcome')
const BoardParser = require('./boardParser')

module.exports = class ScoreCalculator {
  constructor(boardState, position, marker, depth) {
    const updatedBoardState = [...boardState]
    updatedBoardState[position] = marker

    this.position = position
    this.score = 0
    this.board = new Board(updatedBoardState)
    this.marker = marker
    this.depth = depth
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

  get parser() {
    return new BoardParser(this.board.state)
  }

  get forks() {
    const opposingMarker = this.opposingSymbols[this.marker]

    return this.board.forks(opposingMarker)
  }

  calculateScore() {
    if (this.outcome.didWin(this.board, this.marker)) {
      this.score = (100 - (this.depth * 2))
      return;
    }

    const opposingMarker = this.opposingSymbols[this.marker]

    const didOpponentWin = this.forks.some(fork => {
      return this.outcome.didWin(fork, opposingMarker)
    })

    if (didOpponentWin) {
      this.score = -100 + (this.depth * 2)
      return;
    }

  }

  calculateForks() {
    this.forks.forEach(fork => {
      const winningPosition = new BoardParser(fork.state).indexOfWinningPosition(this.marker)
      const opponentWillLetMeWin = fork.openSpaces.includes(winningPosition)

      if (opponentWillLetMeWin) {
        return;
      }

      fork.openSpaces.forEach(index => {
        const newCalc = new this.constructor(fork.state, index, this.marker, this.depth + 10)
        newCalc.calculateScore()
        this.score += newCalc.score
      })
    })
  }
}
