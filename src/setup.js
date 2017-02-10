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
                return 'you win!'
             }
             if (Outcome.didWin(board, game.markerTwo)) {
                return 'you lose!'
             }
             if (Outcome.isGameOver(board, game.markerTwo)) {
                return "it's a tie!"
             }
           }
  }
}
