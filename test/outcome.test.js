const assert = require('chai').assert
const Outcome = require('../outcome')

describe('Outcome', () => {
  context('methods', () => {
    describe('#didWinDiagonally', () => {
      it('can return true when given board, marker, and 3 of them in a row sloping upward', () => {
        const board = [' ', 'X', 'O',
                       ' ', 'O', 'X',
                       'O', 'O', 'X']
        assert.equal(Outcome.didWinDiagonally(board, 'O'), true)
      })

      it('can return true when given board, marker, and 3 of them sloping downward', () => {
        const board = ['X', 'O', 'O',
                       'O', 'X', 'X',
                       'O', 'O', 'X']
        assert.equal(Outcome.didWinDiagonally(board, 'X'), true)
      })

      it('will return false when symbol does not have 3 in a row diagonally', () => {
        const board = ['O', 'O', 'O',
                       'O', 'X', 'O',
                       'O', 'O', 'O']

        assert.equal(Outcome.didWinDiagonally(board, 'O'), false)
      })
    })

    describe('#didWinHorizontally', () => {
      it('can return true when given board, marker, and 3 in a row on top row', () => {
        const board = ['O', 'O', 'O',
                       'X', 'X', 'X',
                       'X', 'X', 'X']

        assert.isTrue(Outcome.didWinHorizontally(board, 'O'))
      })
    })

    it('can return true when given board, marker, and 3 in a row on middle row', () => {
        const board = ['X', 'X', 'X',
                       'O', 'O', 'O',
                       'X', 'X', 'X']

        assert.isTrue(Outcome.didWinHorizontally(board, 'O'))
    })

    it('can return true when given board, marker, and 3 in a row on bottom row', () => {
        const board = ['X', 'G', 'M',
                       'O', 'N', 'O',
                       'X', 'X', 'X']

        assert.isTrue(Outcome.didWinHorizontally(board, 'X'))
    })

    it('can return false when given board, marker, and no 3 in a row horizontally', () => {
        const board = ['X', 'O', 'O',
                       'O', 'X', 'O',
                       'O', 'X', 'X']

        assert.isFalse(Outcome.didWinHorizontally(board, 'X'))
    })

    it('can return false when given board, marker, and no 3 in a row for given marker', () => {
        const board = ['X', 'O', 'X',
                       'X', 'X', 'O',
                       'O', 'O', 'O']

        assert.isFalse(Outcome.didWinHorizontally(board, 'X'))
    })

    describe('#didWinVertically', () => {
      it('can return true when given board, marker, and 3 in a row for given marker to the left', () => {
          const board = ['O', 'O', 'O',
                         'O', 'X', 'X',
                         'O', 'O', 'O']

          assert.isTrue(Outcome.didWinVertically(board, 'O'))
      })

      it('can return true when given board, marker, and 3 in a row for given marker in middle', () => {
          const board = ['O', 'X', 'O',
                         'O', 'X', 'X',
                         'O', 'X', 'O']

          assert.isTrue(Outcome.didWinVertically(board, 'X'))
      })

      it('can return true when given board, marker, and 3 in a row for given marker to the right', () => {
          const board = ['O', 'X', 'O',
                         'X', 'X', 'O',
                         'O', 'X', 'O']

          assert.isTrue(Outcome.didWinVertically(board, 'O'))
      })

      it('can return false when given board, marker, and no 3 in a row for given marker', () => {
          const board = ['X', 'O', 'O',
                         'O', 'X', 'O',
                         'O', 'O', 'X']

          assert.isFalse(Outcome.didWinVertically(board, 'O'))
      })
    })
  })
})
