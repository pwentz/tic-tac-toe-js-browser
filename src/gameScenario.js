const Board = require('./board')
const Outcome = require('./outcome')
const BoardParser = require('./boardParser')

module.exports = class GameScenario {
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

  forks(game) {
    const { opponents } = game

    return this.board.forks(opponents[this.marker])
  }

  calculateScore(game) {
    if (this.outcome.didWin(this.board, this.marker)) {
      this.score = (100 - (this.depth * 2))
      return;
    }

    const didOpponentWin = this.forks(game).some(fork => {
      return this.outcome.didWin(fork, game.opponents[this.marker])
    })

    if (didOpponentWin) {
      this.score = -100 + (this.depth * 2)
      return;
    }
  }

  calculateForks(game) {
    const eligibleForks = this.forks(game).filter(fork => {
      const winningPosition = new BoardParser(fork.state).indexOfWinningPosition(this.marker)
      const willOpponentLetMeWin = fork.openSpaces.includes(winningPosition)
      return !willOpponentLetMeWin
    })

    eligibleForks.forEach(fork => {
      fork.openSpaces.forEach(indexOfOpenSpace => {
        const newScenario = new this.constructor(fork.state, indexOfOpenSpace, this.marker, this.depth + 10)
        newScenario.calculateScore(game)
        this.score += newScenario.score
      })
    })
  }
}
