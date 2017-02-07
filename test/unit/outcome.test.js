const assert = require('chai').assert
const Outcome = require('../../outcome')
const Board = require('../../board')

describe('Outcome', () => {
  describe('#didWinDiagonally', () => {
    it('can return true when given board, marker, and 3 of them in a row sloping upward', () => {
      const board = [' ', 'X', 'O',
                     ' ', 'O', 'X',
                     'O', 'O', 'X']
      assert.isTrue(Outcome.didWinDiagonally(new Board(board), 'O'))
    })

    it('can return true when given board, marker, and 3 of them sloping downward', () => {
      const board = ['X', 'O', 'O',
                     'O', 'X', 'X',
                     'O', 'O', 'X']
      assert.isTrue(Outcome.didWinDiagonally(new Board(board), 'X'))
    })

    it('will return false when symbol does not have 3 in a row diagonally', () => {
      const board = ['O', 'O', 'O',
                     'O', 'X', 'O',
                     'O', 'O', 'O']

      assert.isFalse(Outcome.didWinDiagonally(new Board(board), 'O'))
    })
  })

  describe('#didWinHorizontally', () => {
    it('can return true when given board, marker, and 3 in a row on top row', () => {
      const board = ['O', 'O', 'O',
                     'X', 'X', 'X',
                     'X', 'X', 'X']

      assert.isTrue(Outcome.didWinHorizontally(new Board(board), 'O'))
    })

    it('can return true when given board, marker, and 3 in a row on middle row', () => {
        const board = ['X', 'X', 'X',
                       'O', 'O', 'O',
                       'X', 'X', 'X']

        assert.isTrue(Outcome.didWinHorizontally(new Board(board), 'O'))
    })

    it('can return true when given board, marker, and 3 in a row on bottom row', () => {
        const board = ['X', 'G', 'M',
                       'O', 'N', 'O',
                       'X', 'X', 'X']

        assert.isTrue(Outcome.didWinHorizontally(new Board(board), 'X'))
    })

    it('can return false when given board, marker, and no 3 in a row horizontally', () => {
        const board = ['X', 'O', 'O',
                       'O', 'X', 'O',
                       'O', 'X', 'X']

        assert.isFalse(Outcome.didWinHorizontally(new Board(board), 'X'))
    })

    it('can return false when given board, marker, and no 3 in a row for given marker', () => {
        const board = ['X', 'O', 'X',
                       'X', 'X', 'O',
                       'O', 'O', 'O']

        assert.isFalse(Outcome.didWinHorizontally(new Board(board), 'X'))
    })
  })

  describe('#didWinVertically', () => {
    it('can return true when given board, marker, and 3 in a row for given marker to the left', () => {
        const board = ['O', 'O', 'O',
                       'O', 'X', 'X',
                       'O', 'O', 'O']

        assert.isTrue(Outcome.didWinVertically(new Board(board), 'O'))
    })

    it('can return true when given board, marker, and 3 in a row for given marker in middle', () => {
        const board = ['O', 'X', 'O',
                       'O', 'X', 'X',
                       'O', 'X', 'O']

        assert.isTrue(Outcome.didWinVertically(new Board(board), 'X'))
    })

    it('can return true when given board, marker, and 3 in a row for given marker to the right', () => {
        const board = ['O', 'X', 'O',
                       'X', 'X', 'O',
                       'O', 'X', 'O']

        assert.isTrue(Outcome.didWinVertically(new Board(board), 'O'))
    })

    it('can return false when given board, marker, and no 3 in a row for given marker', () => {
        const board = ['X', 'O', 'O',
                       'O', 'X', 'O',
                       'O', 'O', 'X']

        assert.isFalse(Outcome.didWinVertically(new Board(board), 'O'))
    })
  })

  describe('#didWin', () => {
    context('3 in a row diagonally', () => {
      it('can return true', () => {
        const board = ['X', 'O', 'O',
                       'O', 'X', 'O',
                       'O', 'O', 'X']

        assert.isTrue(Outcome.didWin(new Board(board), 'X'))
      })
    })

    context('3 in horizontally', () => {
      it('can return true', () => {
        const board = ['X', 'X', 'X',
                       'O', ' ', 'O',
                       'O', ' ', 'X']

        assert.isTrue(Outcome.didWin(new Board(board), 'X'))
      })
    })

    context('3 in a row vertically', () => {
      it('can return true', () => {
        const board = ['O', 'X', 'X',
                       'O', 'X', 'O',
                       'O', ' ', 'X']

        assert.isTrue(Outcome.didWin(new Board(board), 'O'))
      })
    })

    context('board is full, but no winner', () => {
      it('returns false', () => {
        const board = ['O', 'X', 'X',
                       'X', 'X', 'O',
                       'O', 'O', 'X']

        assert.isFalse(Outcome.didWin(new Board(board), 'X'))
      })
    })
  })

  describe('#isGameOver', () => {
    context('either player has won', () => {
      it('returns true if playerOne has won', () => {
        const board = ['X', 'O', 'O',
                       'O', 'X', 'O',
                       'O', 'O', 'X']

        const marker = 'X'

        assert.isTrue(Outcome.isGameOver(new Board(board), marker))
      })

      it('returns true if playerTwo has won', () => {
        const board = ['X', 'O', 'X',
                       'O', ' ', 'X',
                       'O', 'O', 'O']

        const marker = 'O'

        assert.isTrue(Outcome.isGameOver(new Board(board), marker))
      })
    })

    context('neither player has won and board is full', () => {
      it('returns true', () => {
        const board = ['X', 'O', 'X',
                       'O', 'X', 'X',
                       'O', 'O', 'O']

        const marker = 'O'

        assert.isTrue(Outcome.isGameOver(new Board(board), marker))
      })
    })
  })
})
