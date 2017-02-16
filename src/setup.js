const Outcome = require('./outcome')
const Board = require('./board')
const Game = require('./game')

module.exports = () => {
  const state = new Array(9)
  state.fill(' ')

  const board = new Board(state)
  const outcome = new Outcome(board.dimensions)
  const game = new Game({ board, markerOne: null,
                                 markerTwo: null })

  return { game,
           board,
           isGameOver() {
             if (outcome.didWin(board, game.markerOne)){
               const positions = outcome.didWin(board, game.markerOne)
               return { positions, message: 'you win!' }
             }
             if (outcome.didWin(board, game.markerTwo)) {
               const positions = outcome.didWin(board, game.markerTwo)
               return { positions, message: 'you lose!' }
             }
             if (outcome.isGameOver(board, game.markerTwo)) {
               return { positions: null, message: "it's a tie!" }
             }
           }
  }
}
