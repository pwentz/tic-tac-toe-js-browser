const assert = require('chai').assert
const Computer = require('../../computer')
const Outcome = require('../../outcome')
const Board = require('../../board')


describe('Game Simulation', () => {
  context('user goes first', function() {
    this.timeout(100000)

    it('never loses to the user', () => {

      for(let i = 0 ; i < 100 ; i++) {

        const state = [' ', ' ', ' ',
                       ' ', ' ', ' ',
                       ' ', ' ', ' ']

        const board = new Board(state)
        const computerMarker = 'X'
        const computer = new Computer(computerMarker)
        const userMarker = 'O'

        while(!Outcome.isGameOver(board, computerMarker) || !Outcome.isGameOver(board, userMarker)) {
          const randomPosition = board.openSpaces[Math.round(Math.random() * (board.openSpaces.length - 1))]

          board.addMarker(userMarker, randomPosition)
          // console.log(board.state.slice(0,3))
          // console.log(board.state.slice(3,6))
          // console.log(board.state.slice(6,9))
          // console.log('---------------')

          assert.isFalse(Outcome.didWin(board, userMarker))

          if (Outcome.isGameOver(board, userMarker)) {
            break
          }

          const move = computer.getMove(board)

          board.addMarker(computerMarker, move)

          if (Outcome.isGameOver(board, computerMarker)) {
            break
          }
          // console.log(board.state.slice(0,3))
          // console.log(board.state.slice(3,6))
          // console.log(board.state.slice(6,9))
          // console.log('---------------')
        }
        // console.log('GAME OVER')

        assert.isFalse(Outcome.didWin(board, userMarker))
      }
    })
  })
})
