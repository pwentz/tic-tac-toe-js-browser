const Board = require('./board')
const Game = require('./game')
const OutcomeFactory = require('./outcomeFactory')

module.exports = (count) => {
  const state = new Array(count).fill(' ')

  const board = new Board(state)
  const factory = new OutcomeFactory(board)
  const game = new Game({ board, markerOne: null,
                                 markerTwo: null })

  return { game,
           board,
           isGameOver() {
             const userOutcome = factory.getOutcome(game.markerOne)
             if (userOutcome.didWin) {
               return { positions: userOutcome.positions, message: 'you win!' }
             }
             const cpuOutcome = factory.getOutcome(game.markerTwo)
             if (cpuOutcome.didWin) {
               return { positions: cpuOutcome.positions, message: 'you lose!' }
             }
             if (board.isFull()) {
               return { positions: null, message: "it's a tie!" }
             }
           }
  }
}
