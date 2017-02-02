const assert = require('chai').assert
const BoardParser = require('../boardParser')

describe('boardParser', () => {
  describe('#inPositionDiagonally', () => {
    it('returns true if markers are sloping downward', () => {
      const board = ['X', 'O', 'O',
                     ' ', ' ', 'O',
                     ' ', 'O', 'X']

      const parser = new BoardParser(board)

      assert.isTrue(parser.inPositionDiagonally('X'))
    })

    it('returns true if markers are sloping upwards', () => {
      const board = [' ', 'O', 'X',
                     ' ', ' ', 'O',
                     'X', 'O', 'X']

      const parser = new BoardParser(board)

      assert.isTrue(parser.inPositionDiagonally('X'))
    })

    it('returns false if no markers are in position diagonally', () => {
      const board = ['O', 'O', 'X',
                     'X', ' ', 'X',
                     'O', 'O', 'X']

      const parser = new BoardParser(board)

      assert.isFalse(parser.inPositionDiagonally('X'))
    })
  })

  describe('#inPositionHorizontally', () => {
    it('returns true if markers are aligned on top row', () => {
      const board = ['X', ' ', 'X',
                     'X', ' ', 'O',
                     'O', 'O', ' ']

      const parser = new BoardParser(board)

      assert.isTrue(parser.inPositionHorizontally('X'))
    })

    it('returns true if markers are aligned on middle row', () => {
      const board = ['X', ' ', 'X',
                     'O', ' ', 'O',
                     ' ', 'X', 'X']

      const parser = new BoardParser(board)

      assert.isTrue(parser.inPositionHorizontally('O'))
    })

    it('returns true if markers are aligned on bottom row', () => {
      const board = ['X', ' ', 'X',
                     'O', ' ', 'X',
                     'O', 'O', ' ']

      const parser = new BoardParser(board)

      assert.isTrue(parser.inPositionHorizontally('O'))
    })

    it('returns false if markers are not aligned horizonally', () => {
      const board = ['O', 'X', 'O',
                     'O', 'X', 'O',
                     'O', 'X', 'O']

      const parser = new BoardParser(board)

      assert.isFalse(parser.inPositionHorizontally('O'))
    })
  })

  describe('#inPositionVertically', () => {
    it('returns true if markers are aligned in left column', () => {
      const board = [' ', 'O', 'X',
                     'O', 'X', 'X',
                     'O', 'X', 'O']

      const parser = new BoardParser(board)

      assert.isTrue(parser.inPositionVertically('O'))
    })

    it('returns true if markers are aligned in middle column', () => {
      const board = ['X', 'O', 'X',
                     'O', 'O', 'X',
                     'X', ' ', 'O']

      const parser = new BoardParser(board)

      assert.isTrue(parser.inPositionVertically('O'))
    })

    it('returns true if markers are aligned in right column', () => {
      const board = ['X', 'O', 'X',
                     'O', 'X', ' ',
                     'X', 'O', 'X']

      const parser = new BoardParser(board)

      assert.isTrue(parser.inPositionVertically('X'))
    })

    it('returns false if markers are not aligned vertically', () => {
      const board = ['X', 'X', 'X',
                     'O', 'O', 'O',
                     'X', 'X', 'X']

      const parser = new BoardParser(board)

      assert.isFalse(parser.inPositionVertically('X'))
    })
  })
})
