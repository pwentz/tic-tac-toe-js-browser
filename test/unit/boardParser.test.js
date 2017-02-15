const assert = require('chai').assert
const BoardParser = require('../../src/boardParser')
const Board = require('../../src/board')

describe('boardParser', () => {
  describe('#indexOfWinningPositionDiagonally', () => {
    context('3x3 board', () => {
      it('returns an open space if markers are sloping downward', () => {
        const state = ['X', 'O', 'O',
                       ' ', ' ', 'O',
                       ' ', 'O', 'X']

        const board = new Board(state)

        const parser = new BoardParser(board.dimensions)

        const result = parser.indexOfWinningPositionDiagonally(board, 'X')

        assert.equal(result, 4)
      })

      it('returns an open space if markers are sloping upwards', () => {
        const state = ['O', 'O', ' ',
                       ' ', 'X', 'O',
                       'X', 'O', 'X']

        const board = new Board(state)

        const parser = new BoardParser(board.dimensions)
        const result = parser.indexOfWinningPositionDiagonally(board, 'X')

        assert.equal(result, 2)
      })

      it('returns -1 if no markers are in position diagonally', () => {
        const state = ['O', 'O', 'X',
                       'X', ' ', 'X',
                       'O', 'O', 'X']

        const board = new Board(state)
        const parser = new BoardParser(board.dimensions)

        const result = parser.indexOfWinningPositionDiagonally(board, 'X')

        assert.equal(result, -1)
      })
    })

    context('5x5 board', () => {
      it('returns the open position if available', () => {
        const state = ['X', 'X', ' ', 'X', 'O',
                       'O', 'X', ' ', 'O', 'O',
                       ' ', ' ', 'X', 'O', ' ',
                       'O', 'O', 'X', ' ', ' ',
                       'O', 'X', 'O', 'O', 'X']

        const board = new Board(state)
        const parser = new BoardParser(board.dimensions)

        const result = parser.indexOfWinningPositionDiagonally(board, 'X')

        assert.equal(result, 18)
      })
    })

    context('7x7 board', () => {
      it('returns the open position if available', () => {
        const state = ['O', 'X', ' ', 'X', 'O', 'X', ' ',
                       'X', 'O', 'X', 'O', ' ', 'X', 'O',
                       ' ', 'X', ' ', 'O', 'X', ' ', 'X',
                       'O', 'O', ' ', 'X', ' ', 'O', 'O',
                       'X', ' ', 'X', 'O', ' ', 'X', 'O',
                       'O', 'X', 'O', ' ', 'X', 'O', ' ',
                       'X', 'X', 'O', 'O', 'X', ' ', 'X']

        const board = new Board(state)
        const parser = new BoardParser(board.dimensions)

        const result = parser.indexOfWinningPositionDiagonally(board, 'X')

        assert.equal(result, 6)
      })
    })
  })

  describe('#indexOfWinningPositionHorizontally', () => {
    context('3x3 board', () => {
      it('returns open space if markers are aligned on top row', () => {
        const state = ['X', ' ', 'X',
                       'X', ' ', 'O',
                       'O', 'O', ' ']

        const board = new Board(state)
        const parser = new BoardParser(board.dimensions)
        const result = parser.indexOfWinningPositionHorizontally(board, 'X')

        assert.strictEqual(result, 1)
      })

      it('returns open space if markers are aligned on middle row', () => {
        const state = ['X', ' ', 'X',
                       'O', 'O', ' ',
                       ' ', 'X', 'X']

        const board = new Board(state)
        const parser = new BoardParser(board.dimensions)

        const result = parser.indexOfWinningPositionHorizontally(board, 'O')

        assert.equal(result, 5)
      })

      it('returns open space if markers are aligned on bottom row', () => {
        const state = ['X', ' ', 'X',
                       'O', ' ', 'X',
                       ' ', 'O', 'O']

        const board = new Board(state)
        const parser = new BoardParser(board.dimensions)

        const result = parser.indexOfWinningPositionHorizontally(board, 'O')

        assert.equal(result, 6)
      })

      it('returns -1 if markers are not aligned horizonally', () => {
        const state = ['X', 'X', 'O',
                       'O', 'X', ' ',
                       'O', 'X', 'O']

        const board = new Board(state)
        const parser = new BoardParser(board.dimensions)

        const result = parser.indexOfWinningPositionHorizontally(board, 'O')

        assert.equal(result, -1)
      })
    })

    context('5x5 board', () => {
      it('returns the open space if available', () => {
        const state = ['X', 'X', ' ', 'X', 'O',
                       'O', 'O', 'O', ' ', 'O',
                       ' ', ' ', 'X', 'O', ' ',
                       'O', 'O', 'X', ' ', ' ',
                       'O', 'X', 'O', 'O', 'X']

        const board = new Board(state)
        const parser = new BoardParser(board.dimensions)

        const result = parser.indexOfWinningPositionHorizontally(board, 'O')

        assert.equal(result, 8)
      })
    })

    context('7x7 board', () => {
      it('returns the open space if available', () => {
        const state = ['O', 'X', ' ', 'X', 'O', 'X', ' ',
                       'X', 'O', 'X', 'O', ' ', 'X', 'O',
                       ' ', 'X', ' ', 'O', 'X', ' ', 'X',
                       'O', 'O', ' ', ' ', ' ', 'O', 'O',
                       'X', ' ', 'X', 'O', ' ', 'X', 'O',
                       'X', ' ', 'X', 'X', 'X', 'X', 'X',
                       'X', 'X', 'O', 'O', 'X', ' ', 'X']

        const board = new Board(state)
        const parser = new BoardParser(board.dimensions)

        const result = parser.indexOfWinningPositionHorizontally(board, 'X')

        assert.equal(result, 36)
      })
    })
  })

  describe('#indexOfWinningPositionVertically', () => {
    context('3x3 board', () => {
      it('returns the open space if markers are aligned in left column', () => {
        const state = ['O', 'O', 'X',
                       'O', 'X', 'X',
                       ' ', 'X', 'O']

        const board = new Board(state)
        const parser = new BoardParser(board.dimensions)

        const result = parser.indexOfWinningPositionVertically(board, 'O')

        assert.strictEqual(result, 6)
      })

      it('returns the open space if markers are aligned in middle column', () => {
        const state = ['X', ' ', 'X',
                       'O', 'O', 'X',
                       'X', 'O', 'O']

        const board = new Board(state)
        const parser = new BoardParser(board.dimensions)

        const result = parser.indexOfWinningPositionVertically(board, 'O')

        assert.strictEqual(result, 1)
      })

      it('returns the open space if markers are aligned in right column', () => {
        const state = ['X', 'O', 'X',
                       'O', 'X', ' ',
                       'X', 'O', 'X']

        const board = new Board(state)
        const parser = new BoardParser(board.dimensions)

        const result = parser.indexOfWinningPositionVertically(board, 'X')


        assert.equal(result, 5)
      })

      it('returns -1 if markers are not aligned vertically', () => {
        const state = ['X', 'X', 'X',
                       'O', 'O', 'O',
                       'X', 'X', 'X']

        const board = new Board(state)
        const parser = new BoardParser(board.dimensions)

        const result = parser.indexOfWinningPositionVertically(board, 'X')

        assert.equal(result, -1)
      })
    })

    context('5x5 board', () => {
      it('returns the open position if available', () => {
        const state = ['X', 'X', ' ', 'X', 'O',
                       'O', 'X', 'O', ' ', 'O',
                       ' ', ' ', 'X', 'O', ' ',
                       'O', 'X', 'X', ' ', ' ',
                       'O', 'X', 'O', 'O', 'X']

        const board = new Board(state)
        const parser = new BoardParser(board.dimensions)

        const result = parser.indexOfWinningPositionVertically(board, 'X')

        assert.equal(result, 11)
      })
    })

    context('7x7 board', () => {
      it('returns the open position if available', () => {
        const state = ['O', 'X', ' ', 'X', 'O', 'X', ' ',
                       'X', 'O', 'X', 'O', 'O', 'X', 'O',
                       ' ', 'X', ' ', 'O', 'O', ' ', 'X',
                       'O', 'O', ' ', ' ', 'O', 'O', 'O',
                       'X', ' ', 'X', 'O', ' ', 'X', 'O',
                       'X', ' ', ' ', 'X', 'O', 'X', 'X',
                       'X', 'X', 'O', 'O', 'O', ' ', 'X']

        const board = new Board(state)
        const parser = new BoardParser(board.dimensions)

        const result = parser.indexOfWinningPositionVertically(board, 'O')

        assert.equal(result, 32)
      })
    })
  })

  describe('#indexOfWinningPosition', () => {
    context('returns the index of position of any winning scenario', () => {
      context('3x3 board', () => {
        it('can return a position for a diagonal victory', () => {
          const state = ['X', 'O', 'X',
                         'O', 'X', 'O',
                         'O', ' ', ' ']

          const board = new Board(state)
          const parser = new BoardParser(board.dimensions)

          const result = parser.indexOfWinningPosition(board, 'X')

          assert.equal(result, 8)
        })

        it('can return a position for a horizontal victory', () => {
          const state = [' ', 'O', 'X',
                         ' ', 'O', 'O',
                         'X', 'X', ' ']

          const board = new Board(state)
          const parser = new BoardParser(board.dimensions)

          const result = parser.indexOfWinningPosition(board, 'O')

          assert.equal(result, 3)
        })

        it('can return a position for a vertical victory', () => {
          const state = [' ', 'O', ' ',
                         ' ', 'X', 'O',
                         'X', 'X', 'O']

          const board = new Board(state)
          const parser = new BoardParser(board.dimensions)

          const result = parser.indexOfWinningPosition(board, 'O')

          assert.equal(result, 2)
        })

        it('returns -1 if there are no positions to win', () => {
          const state = ['X', ' ', ' ',
                         ' ', 'O', ' ',
                         'X', ' ', ' ']

          const board = new Board(state)
          const parser = new BoardParser(board.dimensions)

          const result = parser.indexOfWinningPosition(board, 'O')

          assert.equal(result, -1)
        })
      })

      context('5x5 board', () => {
        it('returns position if available', () => {
          const state = ['X', 'X', ' ', 'X', 'O',
                         'O', ' ', 'O', ' ', 'O',
                         ' ', ' ', 'X', 'O', ' ',
                         'O', ' ', 'X', 'X', ' ',
                         'O', 'X', 'O', 'O', 'X']

          const board = new Board(state)
          const parser = new BoardParser(board.dimensions)

          const result = parser.indexOfWinningPosition(board, 'X')

          assert.equal(result, 6)
        })
      })

      context('7x7 board', () => {
        it('returns position if available', () => {
          const state = ['O', 'X', ' ', 'X', 'O', 'X', ' ',
                         'X', 'O', 'X', 'O', ' ', 'X', 'O',
                         ' ', 'X', ' ', 'O', ' ', ' ', 'X',
                         'O', 'O', 'O', ' ', 'O', 'O', 'O',
                         'X', ' ', 'X', 'O', ' ', 'X', 'O',
                         'X', ' ', ' ', 'X', 'O', 'X', 'X',
                         'X', 'X', 'O', 'O', 'O', ' ', 'X']

          const board = new Board(state)
          const parser = new BoardParser(board.dimensions)

          const result = parser.indexOfWinningPosition(board, 'O')

          assert.equal(result, 24)
        })
      })
    })
  })
})
