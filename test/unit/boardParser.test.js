const assert = require('chai').assert
const BoardParser = require('../../src/boardParser')

describe('boardParser', () => {
  describe('#indexOfWinningPositionDiagonally', () => {
    it('returns an open space if markers are sloping downward', () => {
      const board = ['X', 'O', 'O',
                     ' ', ' ', 'O',
                     ' ', 'O', 'X']

      const result = BoardParser.indexOfWinningPositionDiagonally(board, 'X')

      assert.equal(result, 4)
    })

    it('returns an open space if markers are sloping upwards', () => {
      const board = ['O', 'O', ' ',
                     ' ', 'X', 'O',
                     'X', 'O', 'X']

      const result = BoardParser.indexOfWinningPositionDiagonally(board, 'X')

      assert.equal(result, 2)
    })

    it('returns -1 if no markers are in position diagonally', () => {
      const board = ['O', 'O', 'X',
                     'X', ' ', 'X',
                     'O', 'O', 'X']

      const result = BoardParser.indexOfWinningPositionDiagonally(board, 'X')

      assert.equal(result, -1)
    })
  })

  describe('#indexOfWinningPositionHorizontally', () => {
    it('returns open space if markers are aligned on top row', () => {
      const board = ['X', ' ', 'X',
                     'X', ' ', 'O',
                     'O', 'O', ' ']

      const result = BoardParser.indexOfWinningPositionHorizontally(board, 'X')

      assert.strictEqual(result, 1)
    })

    it('returns open space if markers are aligned on middle row', () => {
      const board = ['X', ' ', 'X',
                     'O', 'O', ' ',
                     ' ', 'X', 'X']

      const result = BoardParser.indexOfWinningPositionHorizontally(board, 'O')

      assert.equal(result, 5)
    })

    it('returns open space if markers are aligned on bottom row', () => {
      const board = ['X', ' ', 'X',
                     'O', ' ', 'X',
                     ' ', 'O', 'O']

      const result = BoardParser.indexOfWinningPositionHorizontally(board, 'O')

      assert.equal(result, 6)
    })

    it('returns -1 if markers are not aligned horizonally', () => {
      const board = ['X', 'X', 'O',
                     'O', 'X', ' ',
                     'O', 'X', 'O']

      const result = BoardParser.indexOfWinningPositionHorizontally(board, 'O')

      assert.equal(result, -1)
    })
  })

  describe('#indexOfWinningPositionVertically', () => {
    it('returns the open space if markers are aligned in left column', () => {
      const board = ['O', 'O', 'X',
                     'O', 'X', 'X',
                     ' ', 'X', 'O']

      const result = BoardParser.indexOfWinningPositionVertically(board, 'O')

      assert.strictEqual(result, 6)
    })

    it('returns the open space if markers are aligned in middle column', () => {
      const board = ['X', ' ', 'X',
                     'O', 'O', 'X',
                     'X', 'O', 'O']

      const result = BoardParser.indexOfWinningPositionVertically(board, 'O')

      assert.strictEqual(result, 1)
    })

    it('returns the open space if markers are aligned in right column', () => {
      const board = ['X', 'O', 'X',
                     'O', 'X', ' ',
                     'X', 'O', 'X']

      const result = BoardParser.indexOfWinningPositionVertically(board, 'X')

      assert.equal(result, 5)
    })

    it('returns -1 if markers are not aligned vertically', () => {
      const board = ['X', 'X', 'X',
                     'O', 'O', 'O',
                     'X', 'X', 'X']

      const result = BoardParser.indexOfWinningPositionVertically(board, 'X')

      assert.equal(result, -1)
    })
  })

  describe('#indexOfWinningPosition', () => {
    context('returns the index of position of any winning scenario', () => {
      it('can return a position for a diagonal victory', () => {
        const board = ['X', 'O', 'X',
                       'O', 'X', 'O',
                       'O', ' ', ' ']

        const result = BoardParser.indexOfWinningPosition(board, 'X')

        assert.equal(result, 8)
      })

      it('can return a position for a horizontal victory', () => {
        const board = [' ', 'O', 'X',
                       ' ', 'O', 'O',
                       'X', 'X', ' ']

        const result = BoardParser.indexOfWinningPosition(board, 'O')

        assert.equal(result, 3)
      })

      it('can return a position for a vertical victory', () => {
        const board = [' ', 'O', ' ',
                       ' ', 'X', 'O',
                       'X', 'X', 'O']

        const result = BoardParser.indexOfWinningPosition(board, 'O')

        assert.equal(result, 2)
      })

      it('returns -1 if there are no positions to win', () => {
        const board = ['X', ' ', ' ',
                       ' ', 'O', ' ',
                       'X', ' ', ' ']

        const result = BoardParser.indexOfWinningPosition(board, 'O')

        assert.equal(result, -1)
      })
    })
  })
})
