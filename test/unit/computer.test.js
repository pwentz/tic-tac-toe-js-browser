const assert = require('chai').assert
const Computer = require('../../computer')
const Board = require('../../board')
const Game = require('../../game')

describe('Computer', () => {
  describe('#getMove', () => {
    context('end game', () => {
      it('can return the move that will seal the victory', () => {
        const board = ['X', 'O', ' ',
                       'O', ' ', ' ',
                       ' ', ' ', 'X']

        const computer = new Computer('X')
        const game = new Game({ board: new Board(board),
                                markerOne: 'X',
                                markerTwo: 'O' })

        assert.equal(computer.getMove(game), 4)
      })

      it('can return another move that will seal the victory', () => {
        const board = ['X', 'X', 'O',
                       ' ', ' ', 'O',
                       'O', ' ', ' ']

        const computer = new Computer('O')

        const game = new Game({ board: new Board(board),
                                markerOne: 'X',
                                markerTwo: 'O' })

        const move = computer.getMove(game)

        const isFourOrEight = (move) => move === 8 || move === 4

        assert.isTrue(isFourOrEight(move))
      })

      it('can return the move that will block opponent', () => {
        const board = ['X', 'O', ' ',
                       'O', ' ', ' ',
                       'X', 'X', ' ']

        const computer = new Computer('O')

        const game = new Game({ board: new Board(board),
                                markerOne: 'X',
                                markerTwo: 'O' })

        assert.equal(computer.getMove(game), 8)
      })

      it('can return another move that will block opponent', () => {
        const board = ['O', ' ', ' ',
                       'O', ' ', ' ',
                       'X', 'X', ' ']

        const computer = new Computer('O')

        const game = new Game({ board: new Board(board),
                                markerOne: 'X',
                                markerTwo: 'O' })

        assert.equal(computer.getMove(game), 8)
      })
    })

    context('more ambiguous scenarios', () => {
      it('will return position to cut off forking strategy', () => {
        const board = [' ', ' ', 'O',
                       ' ', 'X', ' ',
                       'O', ' ', ' ']

        const computer = new Computer('X')

        const game = new Game({ board: new Board(board),
                                markerOne: 'X',
                                markerTwo: 'O' })

        const move = computer.getMove(game)

        const isTwoOrSeven = move => (move === 1) || (move === 7)

        assert.isTrue(isTwoOrSeven(move))
      })

      it('then takes a corner', () => {
        const board = [' ', 'X', 'O',
                       ' ', 'X', ' ',
                       'O', 'O', ' ']

        const computer = new Computer('X')

        const game = new Game({ board: new Board(board),
                                markerOne: 'X',
                                markerTwo: 'O' })

        assert.equal(computer.getMove(game), 8)
      })
    })
  })
})
