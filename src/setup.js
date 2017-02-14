const Outcome = require('./outcome')
const Board = require('./board')
const Game = require('./game')

module.exports = () => {
  const state = [' ', ' ', ' ',
                 ' ', ' ', ' ',
                 ' ', ' ', ' ']

  const board = new Board(state)
  const game = new Game({ board, markerOne: null,
                                 markerTwo: null })

  return { game,
           board,
           isGameOver() {
             if (Outcome.didWin(board, game.markerOne)){
               const positions = Outcome.didWin(board, game.markerOne)
               return { positions, message: 'you win!' }
             }
             if (Outcome.didWin(board, game.markerTwo)) {
               const positions = Outcome.didWin(board, game.markerTwo)
               return { positions, message: 'you lose!' }
             }
             if (Outcome.isGameOver(board, game.markerTwo)) {
               return { positions: null, message: "it's a tie!" }
             }
           }
  }
}
