const assert = require('chai').assert
const Computer = require('../../src/computer')
const Board = require('../../src/board')
const Game = require('../../src/game')

describe('Computer', () => {
  describe('#getMove', () => {
    context('end game', () => {
      context('3x3 board', () => {
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

      context('5x5 board', () => {
        it('can return the move that will win', () => {
          const state = ['X', 'X', ' ', 'X', 'O',
                         'O', 'X', ' ', 'O', 'O',
                         ' ', ' ', ' ', 'O', ' ',
                         'O', 'O', 'X', ' ', ' ',
                         'O', 'X', 'O', 'O', 'X']

          const computer = new Computer('O')
          const game = new Game({ board: new Board(state),
                                  markerOne: 'X',
                                  markerTwo: 'O' })

          assert.equal(computer.getMove(game), 12)
        })

        it('can return move that will block opponent', () => {
          const state = ['X', 'X', ' ', 'X', 'O',
                         'O', 'X', ' ', 'O', 'O',
                         ' ', ' ', ' ', 'O', ' ',
                         'O', 'X', 'X', ' ', ' ',
                         'O', 'X', 'O', 'O', 'X']

          const computer = new Computer('O')
          const game = new Game({ board: new Board(state),
                                  markerOne: 'X',
                                  markerTwo: 'O' })

          assert.equal(computer.getMove(game), 11)
        })
      })

      context('7x7 board', () => {
        it('can return the move that will block opponent', () => {
          const state = ['X', ' ', ' ', 'X', 'O', 'X', 'X',
                         ' ', 'X', 'O', 'O', ' ', 'X', 'O',
                         ' ', ' ', 'X', 'O', 'X', ' ', 'X',
                         'O', 'O', ' ', 'X', ' ', 'O', 'O',
                         'X', ' ', ' ', 'O', ' ', 'X', 'O',
                         'X', ' ', 'X', ' ', 'X', 'X', 'X',
                         ' ', 'X', 'O', 'O', 'X', ' ', 'X']

          const computer = new Computer('O')

          const game = new Game({ board: new Board(state),
                                  markerOne: 'X',
                                  markerTwo: 'O' })

          assert.equal(computer.getMove(game), 32)
        })

        it('can return the move that will win', () => {
          const state = ['X', ' ', ' ', 'X', 'O', 'X', 'O',
                         ' ', ' ', 'O', 'O', ' ', 'O', 'O',
                         ' ', ' ', 'X', 'O', 'O', ' ', 'X',
                         'O', 'O', ' ', 'O', ' ', 'O', 'O',
                         'X', ' ', 'O', 'O', ' ', 'X', 'O',
                         'X', ' ', 'X', ' ', 'X', 'X', 'X',
                         'O', 'X', 'O', 'O', 'X', ' ', 'X']

          const computer = new Computer('O')

          const game = new Game({ board: new Board(state),
                                  markerOne: 'X',
                                  markerTwo: 'O' })

          assert.equal(computer.getMove(game), 36)
        })
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

        const isOneOrSeven = move => (move === 1) || (move === 7)

        assert.isTrue(isOneOrSeven(move))
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
