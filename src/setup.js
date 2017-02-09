const Computer = require('./computer')
const Outcome = require('./outcome')
const Board = require('./board')
const Game = require('./game')

module.exports = () => {
  const state = [' ', ' ', ' ',
                 ' ', ' ', ' ',
                 ' ', ' ', ' ']

  const board = new Board(state)
  const computerMarker = 'X'
  const userMarker = 'O'
  const computer = new Computer(computerMarker)
  const game = new Game({ board, markerOne: computerMarker,
                                 markerTwo: userMarker })

  return { game,
           userMarker,
           computerMarker,
           computer,
           board,
           isGameOver() {
             if (Outcome.didWin(board, userMarker)){
                return () => 'user wins'
             }
             if (Outcome.didWin(board, computerMarker)) {
                return () => 'computer wins'
             }
             if (Outcome.isGameOver(board, userMarker)) {
                return () => 'tie!'
             }
           }
  }
}
