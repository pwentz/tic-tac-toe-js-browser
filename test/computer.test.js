const assert = require('chai').assert
const Computer = require('../computer')
const Board = require('../board')

describe('Computer', () => {
  describe('#getMove', () => {
    context('end game', () => {
      it('can return the move that will seal the victory', () => {
        const board = ['X', 'O', ' ',
                       'O', ' ', ' ',
                       ' ', ' ', 'X']

        const computer = new Computer('X')

        assert.equal(computer.getMove(new Board(board)), 4)
      })

      it('can return the move that will block opponent', () => {
        const board = ['X', 'O', ' ',
                       'O', ' ', ' ',
                       ' ', ' ', 'X']

        const computer = new Computer('O')

        assert.equal(computer.getMove(new Board(board)), 4)
      })
    })

    context('more ambiguous scenarios', () => {
      it('will return position to cut off forking strategy', () => {
        const board = ['X', ' ', ' ',
                       ' ', 'O', ' ',
                       ' ', ' ', 'O']

        const computer = new Computer('X')

        assert.equal(computer.getMove(new Board(board)), 2)
      })

      it('if position can help both offense and defense, it plays that position', () => {
        const board = [' ', ' ', 'X',
                       ' ', 'O', ' ',
                       'O', ' ', ' ']

        const computer = new Computer('X')

        assert.equal(computer.getMove(new Board(board)), 0)
      })
    })
  })
})
