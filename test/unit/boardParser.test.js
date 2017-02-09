const assert = require('chai').assert
const BoardParser = require('../../src/boardParser')

describe('boardParser', () => {
  describe('#indexOfWinningPositionDiagonally', () => {
    it('returns an open space if markers are sloping downward', () => {
      const board = ['X', 'O', 'O',
                     ' ', ' ', 'O',
                     ' ', 'O', 'X']

      const parser = new BoardParser(board)

      assert.equal(parser.indexOfWinningPositionDiagonally('X'), 4)
    })

    it('returns an open space if markers are sloping upwards', () => {
      const board = ['O', 'O', ' ',
                     ' ', 'X', 'O',
                     'X', 'O', 'X']

      const parser = new BoardParser(board)

      assert.equal(parser.indexOfWinningPositionDiagonally('X'), 2)
    })

    it('returns -1 if no markers are in position diagonally', () => {
      const board = ['O', 'O', 'X',
                     'X', ' ', 'X',
                     'O', 'O', 'X']

      const parser = new BoardParser(board)

      assert.equal(parser.indexOfWinningPositionDiagonally('X'), -1)
    })
  })

  describe('#indexOfWinningPositionHorizontally', () => {
    it('returns open space if markers are aligned on top row', () => {
      const board = ['X', ' ', 'X',
                     'X', ' ', 'O',
                     'O', 'O', ' ']

      const parser = new BoardParser(board)

      assert.strictEqual(parser.indexOfWinningPositionHorizontally('X'), 1)
    })

    it('returns open space if markers are aligned on middle row', () => {
      const board = ['X', ' ', 'X',
                     'O', 'O', ' ',
                     ' ', 'X', 'X']

      const parser = new BoardParser(board)

      assert.equal(parser.indexOfWinningPositionHorizontally('O'), 5)
    })

    it('returns open space if markers are aligned on bottom row', () => {
      const board = ['X', ' ', 'X',
                     'O', ' ', 'X',
                     ' ', 'O', 'O']

      const parser = new BoardParser(board)

      assert.equal(parser.indexOfWinningPositionHorizontally('O'), 6)
    })

    it('returns -1 if markers are not aligned horizonally', () => {
      const board = ['X', 'X', 'O',
                     'O', 'X', ' ',
                     'O', 'X', 'O']

      const parser = new BoardParser(board)

      assert.equal(parser.indexOfWinningPositionHorizontally('O'), -1)
    })
  })

  describe('#indexOfWinningPositionVertically', () => {
    it('returns the open space if markers are aligned in left column', () => {
      const board = ['O', 'O', 'X',
                     'O', 'X', 'X',
                     ' ', 'X', 'O']

      const parser = new BoardParser(board)

      assert.strictEqual(parser.indexOfWinningPositionVertically('O'), 6)
    })

    it('returns the open space if markers are aligned in middle column', () => {
      const board = ['X', ' ', 'X',
                     'O', 'O', 'X',
                     'X', 'O', 'O']

      const parser = new BoardParser(board)

      assert.strictEqual(parser.indexOfWinningPositionVertically('O'), 1)
    })

    it('returns the open space if markers are aligned in right column', () => {
      const board = ['X', 'O', 'X',
                     'O', 'X', ' ',
                     'X', 'O', 'X']

      const parser = new BoardParser(board)

      assert.equal(parser.indexOfWinningPositionVertically('X'), 5)
    })

    it('returns -1 if markers are not aligned vertically', () => {
      const board = ['X', 'X', 'X',
                     'O', 'O', 'O',
                     'X', 'X', 'X']

      const parser = new BoardParser(board)

      assert.equal(parser.indexOfWinningPositionVertically('X'), -1)
    })
  })

  describe('#indexOfWinningPosition', () => {
    context('returns the index of position of any winning scenario', () => {
      it('can return a position for a diagonal victory', () => {
        const board = ['X', 'O', 'X',
                       'O', 'X', 'O',
                       'O', ' ', ' ']

        const parser = new BoardParser(board)

        assert.equal(parser.indexOfWinningPosition('X'), 8)
      })

      it('can return a position for a horizontal victory', () => {
        const board = [' ', 'O', 'X',
                       ' ', 'O', 'O',
                       'X', 'X', ' ']

        const parser = new BoardParser(board)

        assert.equal(parser.indexOfWinningPosition('O'), 3)
      })

      it('can return a position for a vertical victory', () => {
        const board = [' ', 'O', ' ',
                       ' ', 'X', 'O',
                       'X', 'X', 'O']

        const parser = new BoardParser(board)

        assert.equal(parser.indexOfWinningPosition('O'), 2)
      })

      it('returns -1 if there are no positions to win', () => {
        const board = ['X', ' ', ' ',
                       ' ', 'O', ' ',
                       'X', ' ', ' ']

        const parser = new BoardParser(board)

        assert.equal(parser.indexOfWinningPosition('O'), -1)
      })
    })
  })
})
