const Board = require('./board')
const OutcomeFactory = require('./outcomeFactory')

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

  allForks(game) {
    const { opponents } = game

    return this.board.getForks(opponents[this.marker])
  }

  validForks(game) {
    const { opponents } = game

    const opponentWillNotLetMeWin = (fork) => {
      const outcome = new OutcomeFactory(fork).getOutcome(this.marker)
      return !outcome.willWin
    }

    return this.board.getForks(opponents[this.marker], opponentWillNotLetMeWin)
  }

  calculateScore(game) {
    const outcome = new OutcomeFactory(this.board).getOutcome(this.marker)
    if (outcome.didWin) {
      this.score = 10 - this.depth
      return;
    }

    const didOpponentWin = this.allForks(game).some(fork => {
      const outcome = new OutcomeFactory(fork).getOutcome(game.opponents[this.marker])
      return outcome.didWin
    })

    if (didOpponentWin) {
      this.score = -10 + this.depth
      return;
    }
  }

  calculateForks(game) {
    this.validForks(game).forEach(fork => {
      fork.openSpaces.forEach(indexOfOpenSpace => {
        const newScenario = new this.constructor(fork.state, indexOfOpenSpace, this.marker, this.depth + 1)
        newScenario.calculateScore(game)
        this.score += newScenario.score
      })
    })
  }
}
