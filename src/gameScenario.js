const Board = require('./board')
const Outcome = require('./outcome')

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

  allForks(game) {
    const { opponents } = game

    return this.board.allForks(opponents[this.marker])
  }

  validForks(game) {
    const { opponents } = game

    return this.board.validForks(this.marker, opponents[this.marker])
  }

  calculateScore(game) {
    if (this.outcome.didWin(this.board, this.marker)) {
      this.score = (100 - (this.depth * 2))
      return;
    }

    const didOpponentWin = this.allForks(game).some(fork => {
      return this.outcome.didWin(fork, game.opponents[this.marker])
    })

    if (didOpponentWin) {
      this.score = -100 + (this.depth * 2)
      return;
    }
  }

  calculateForks(game) {
    this.validForks(game).forEach(fork => {
      fork.openSpaces.forEach(indexOfOpenSpace => {
        const newScenario = new this.constructor(fork.state, indexOfOpenSpace, this.marker, this.depth + 10)
        newScenario.calculateScore(game)
        this.score += newScenario.score
      })
    })
  }
}
