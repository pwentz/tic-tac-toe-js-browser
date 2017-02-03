const assert = require('chai').assert
const BoardParser = require('../boardParser')

describe('boardParser', () => {
  describe('#inPositionDiagonally', () => {
    it('returns an open space if markers are sloping downward', () => {
      const board = ['X', 'O', 'O',
                     ' ', ' ', 'O',
                     ' ', 'O', 'X']

      const parser = new BoardParser(board)

      assert.equal(parser.inPositionDiagonally('X'), 4)
    })

    it('returns an open space if markers are sloping upwards', () => {
      const board = ['O', 'O', ' ',
                     ' ', 'X', 'O',
                     'X', 'O', 'X']

      const parser = new BoardParser(board)

      assert.equal(parser.inPositionDiagonally('X'), 2)
    })

    it('returns -1 if no markers are in position diagonally', () => {
      const board = ['O', 'O', 'X',
                     'X', ' ', 'X',
                     'O', 'O', 'X']

      const parser = new BoardParser(board)

      assert.equal(parser.inPositionDiagonally('X'), -1)
    })
  })

  describe('#inPositionHorizontally', () => {
    it('returns open space if markers are aligned on top row', () => {
      const board = ['X', ' ', 'X',
                     'X', ' ', 'O',
                     'O', 'O', ' ']

      const parser = new BoardParser(board)

      assert.strictEqual(parser.inPositionHorizontally('X'), 1)
    })

    it('returns open space if markers are aligned on middle row', () => {
      const board = ['X', ' ', 'X',
                     'O', 'O', ' ',
                     ' ', 'X', 'X']

      const parser = new BoardParser(board)

      assert.equal(parser.inPositionHorizontally('O'), 5)
    })

    it('returns open space if markers are aligned on bottom row', () => {
      const board = ['X', ' ', 'X',
                     'O', ' ', 'X',
                     ' ', 'O', 'O']

      const parser = new BoardParser(board)

      assert.equal(parser.inPositionHorizontally('O'), 6)
    })

    it('returns -1 if markers are not aligned horizonally', () => {
      const board = ['X', 'X', 'O',
                     'O', 'X', ' ',
                     'O', 'X', 'O']

      const parser = new BoardParser(board)

      assert.equal(parser.inPositionHorizontally('O'), -1)
    })
  })

  describe('#inPositionVertically', () => {
    it('returns the open space if markers are aligned in left column', () => {
      const board = ['O', 'O', 'X',
                     'O', 'X', 'X',
                     ' ', 'X', 'O']

      const parser = new BoardParser(board)

      assert.strictEqual(parser.inPositionVertically('O'), 6)
    })

    it('returns the open space if markers are aligned in middle column', () => {
      const board = ['X', ' ', 'X',
                     'O', 'O', 'X',
                     'X', 'O', 'O']

      const parser = new BoardParser(board)

      assert.strictEqual(parser.inPositionVertically('O'), 1)
    })

    it('returns the open space if markers are aligned in right column', () => {
      const board = ['X', 'O', 'X',
                     'O', 'X', ' ',
                     'X', 'O', 'X']

      const parser = new BoardParser(board)

      assert.equal(parser.inPositionVertically('X'), 5)
    })

    it('returns -1 if markers are not aligned vertically', () => {
      const board = ['X', 'X', 'X',
                     'O', 'O', 'O',
                     'X', 'X', 'X']

      const parser = new BoardParser(board)

      assert.equal(parser.inPositionVertically('X'), -1)
    })
  })
})
