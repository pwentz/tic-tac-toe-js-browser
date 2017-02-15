const assert = require('chai').assert
const Outcome = require('../../src/outcome')
const Board = require('../../src/board')

describe('Outcome', () => {
  describe('#didWinDiagonally', () => {
    it('can return true when given board, marker, and 3 of them in a row sloping upward', () => {
      const state = [' ', 'X', 'O',
                     ' ', 'O', 'X',
                     'O', 'O', 'X']

      const board = new Board(state)
      const outcome = new Outcome(board.dimensions)

      assert.isTrue(outcome.didWinDiagonally(board, 'O'))
    })

    it('can return true when given board, marker, and 3 of them sloping downward', () => {
      const state = ['X', 'O', 'O',
                     'O', 'X', 'X',
                     'O', 'O', 'X']

      const board = new Board(state)
      const outcome = new Outcome(board.dimensions)

      assert.isTrue(outcome.didWinDiagonally(board, 'X'))
    })

    it('will return false when symbol does not have 3 in a row diagonally', () => {
      const state = ['O', 'O', 'O',
                     'O', 'X', 'O',
                     'O', 'O', 'O']

      const board = new Board(state)
      const outcome = new Outcome(board.dimensions)

      assert.isFalse(outcome.didWinDiagonally(board, 'O'))
    })
  })

  describe('#didWinHorizontally', () => {
    it('can return true when given board, marker, and 3 in a row on top row', () => {
      const state = ['O', 'O', 'O',
                     'X', 'X', 'X',
                     'X', 'X', 'X']

      const board = new Board(state)
      const outcome = new Outcome(board.dimensions)

      assert.isTrue(outcome.didWinHorizontally(board, 'O'))
    })

    it('can return true when given board, marker, and 3 in a row on middle row', () => {
        const state = ['X', 'X', 'X',
                       'O', 'O', 'O',
                       'X', 'X', 'X']

        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isTrue(outcome.didWinHorizontally(board, 'O'))
    })

    it('can return true when given board, marker, and 3 in a row on bottom row', () => {
        const state = ['X', 'G', 'M',
                       'O', 'N', 'O',
                       'X', 'X', 'X']

        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isTrue(outcome.didWinHorizontally(board, 'X'))
    })

    it('can return false when given board, marker, and no 3 in a row horizontally', () => {
        const state = ['X', 'O', 'O',
                       'O', 'X', 'O',
                       'O', 'X', 'X']

        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isFalse(outcome.didWinHorizontally(board, 'X'))
    })

    it('can return false when given board, marker, and no 3 in a row for given marker', () => {
        const state = ['X', 'O', 'X',
                       'X', 'X', 'O',
                       'O', 'O', 'O']

        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isFalse(outcome.didWinHorizontally(board, 'X'))
    })
  })

  describe('#didWinVertically', () => {
    it('can return true when given board, marker, and 3 in a row for given marker to the left', () => {
        const state = ['O', 'O', 'O',
                       'O', 'X', 'X',
                       'O', 'O', 'O']

        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isTrue(outcome.didWinVertically(board, 'O'))
    })

    it('can return true when given board, marker, and 3 in a row for given marker in middle', () => {
        const state = ['O', 'X', 'O',
                       'O', 'X', 'X',
                       'O', 'X', 'O']

        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isTrue(outcome.didWinVertically(board, 'X'))
    })

    it('can return true when given board, marker, and 3 in a row for given marker to the right', () => {
        const state = ['O', 'X', 'O',
                       'X', 'X', 'O',
                       'O', 'X', 'O']

        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isTrue(outcome.didWinVertically(board, 'O'))
    })

    it('can return false when given board, marker, and no 3 in a row for given marker', () => {
        const state = ['X', 'O', 'O',
                       'O', 'X', 'O',
                       'O', 'O', 'X']

        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)
        assert.isFalse(outcome.didWinVertically(board, 'O'))
    })
  })

  describe('#didWin', () => {
    context('3 in a row diagonally', () => {
      it('can return true', () => {
        const state = ['X', 'O', 'O',
                       'O', 'X', 'O',
                       'O', 'O', 'X']

        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isTrue(outcome.didWin(board, 'X'))
      })
    })

    context('3 in horizontally', () => {
      it('can return true', () => {
        const state = ['X', 'X', 'X',
                       'O', ' ', 'O',
                       'O', ' ', 'X']

        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isTrue(outcome.didWin(board, 'X'))
      })
    })

    context('3 in a row vertically', () => {
      it('can return true', () => {
        const state = ['O', 'X', 'X',
                       'O', 'X', 'O',
                       'O', ' ', 'X']

        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isTrue(outcome.didWin(board, 'O'))
      })
    })

    context('board is full, but no winner', () => {
      it('returns false', () => {
        const state = ['O', 'X', 'X',
                       'X', 'X', 'O',
                       'O', 'O', 'X']

        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isFalse(outcome.didWin(board, 'X'))
      })
    })
  })

  describe('#isGameOver', () => {
    context('either player has won', () => {
      it('returns true if playerOne has won', () => {
        const state = ['X', 'O', 'O',
                       'O', 'X', 'O',
                       'O', 'O', 'X']

        const marker = 'X'
        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isTrue(outcome.isGameOver(board, marker))
      })

      it('returns true if playerTwo has won', () => {
        const state = ['X', 'O', 'X',
                       'O', ' ', 'X',
                       'O', 'O', 'O']

        const marker = 'O'
        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isTrue(outcome.isGameOver(board, marker))
      })
    })

    context('neither player has won and board is full', () => {
      it('returns true', () => {
        const state = ['X', 'O', 'X',
                       'O', 'X', 'X',
                       'O', 'O', 'O']

        const marker = 'O'
        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isTrue(outcome.isGameOver(board, marker))
      })
    })
  })
})
