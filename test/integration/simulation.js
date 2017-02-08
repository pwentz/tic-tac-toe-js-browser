const assert = require('chai').assert
const Computer = require('../../computer')
const Outcome = require('../../outcome')
const Board = require('../../board')


describe('Game Simulation', function() {
  this.timeout(100000)
  context('user goes first', () => {

    it('never loses to the user', () => {

      for(let i = 0 ; i < 100 ; i++) {

        const state = [' ', ' ', ' ',
                       ' ', ' ', ' ',
                       ' ', ' ', ' ']

        const board = new Board(state)
        const computerMarker = 'X'
        const computer = new Computer(computerMarker)
        const userMarker = 'O'

        while(!Outcome.isGameOver(board, computerMarker)) {
          const randomPosition = board.openSpaces[Math.round(Math.random() * (board.openSpaces.length - 1))]

          board.addMarker(userMarker, randomPosition)
          console.log(board.state.slice(0,3))
          console.log(board.state.slice(3,6))
          console.log(board.state.slice(6,9))
          console.log('---------------')

          if (Outcome.isGameOver(board, userMarker)) {
            break
          }

          const move = computer.getMove(board)

          board.addMarker(computerMarker, move)

          console.log(board.state.slice(0,3))
          console.log(board.state.slice(3,6))
          console.log(board.state.slice(6,9))
          console.log('---------------')
        }

        console.log('GAME OVER')

        assert.isFalse(Outcome.didWin(board, userMarker))
      }
    })
  })

  context('computer plays computer', () => {
    it('is a tie everytime', () => {
      for(let i = 0 ; i < 100 ; i++) {

        const state = [' ', ' ', ' ',
                       ' ', ' ', ' ',
                       ' ', ' ', ' ']

        const board = new Board(state)
        const computerOneMarker = 'X'
        const computerOne = new Computer(computerOneMarker)
        const computerTwoMarker = 'O'
        const computerTwo = new Computer(computerTwoMarker)

        while(!Outcome.isGameOver(board, computerTwoMarker)) {
          const computerOneMove = computerOne.getMove(board)

          board.addMarker(computerOneMarker, computerOneMove)

          if (Outcome.isGameOver(board, computerOneMarker)) {
            break
          }

          const computerTwoMove = computerTwo.getMove(board)

          board.addMarker(computerTwoMarker, computerTwoMove)
        }

        assert.isFalse(Outcome.didWin(board, computerOneMarker))
        assert.isFalse(Outcome.didWin(board, computerTwoMarker))
      }
    })
  })
})
