const Computer = require('./computer')
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
  const computer = new Computer()

  const markerDict = { 'X': 'O', 'O':'X' }

  return { game,
           markerDict,
           computer,
           board,
           isGameOver() {
             if (Outcome.didWin(board, game.markerOne)){
                return () => 'you win!'
             }
             if (Outcome.didWin(board, game.markerTwo)) {
                return () => 'computer wins!'
             }
             if (Outcome.isGameOver(board, game.markerTwo)) {
                return () => "it's a tie!"
             }
           }
  }
}
