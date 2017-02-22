const Board = require('./board')
const BoardParser = require('./boardParser')
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

  get parser() {
    return new BoardParser(this.board)
  }

  allForks(game) {
    const { opponents } = game

    return this.board.getForks(opponents[this.marker])
  }

  validForks(game) {
    const { opponents } = game

    const opponentWillNotLetMeWin = (fork) => {
      const outcome = new BoardParser(fork).parse(this.marker)
      return !outcome.willWin
    }

    return this.board.getForks(opponents[this.marker], opponentWillNotLetMeWin)
  }

  calculateScore(game) {
    const outcome = this.parser.parse(this.marker)
    if (outcome.didWin) {
      this.score = (100 - (this.depth * 2))
      return;
    }

    const didOpponentWin = this.allForks(game).some(fork => {
      const outcome = new BoardParser(fork).parse(game.opponents[this.marker])
      return outcome.didWin
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
