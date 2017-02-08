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

  get outcome() {
    return Outcome
  }

  calculateScore(game) {
    const { opponents } = game

    if (this.outcome.didWin(this.board, this.marker)) {
      this.score = (100 - (this.depth * 2))
      return;
    }

    const opposingMarker = opponents[this.marker]

    const didOpponentWin = this.board.forks(opposingMarker).some(fork => {
      return this.outcome.didWin(fork, opposingMarker)
    })

    if (didOpponentWin) {
      this.score = -100 + (this.depth * 2)
      return;
    }

  }

  calculateForks(game) {
    const { opponents } = game

    this.board.forks(opponents[this.marker]).forEach(fork => {
      const winningPosition = new BoardParser(fork.state).indexOfWinningPosition(this.marker)
      const opponentWillLetMeWin = fork.openSpaces.includes(winningPosition)

      if (opponentWillLetMeWin) {
        return;
      }

      fork.openSpaces.forEach(index => {
        const newCalc = new this.constructor(fork.state, index, this.marker, this.depth + 10)
        newCalc.calculateScore(game)
        this.score += newCalc.score
      })
    })
  }
}
