const assert = require('chai').assert
const Outcome = require('../../src/outcome')
const Board = require('../../src/board')

describe('Outcome', () => {
  describe('#didWinDiagonally', () => {
    context('3x3 board', () => {
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

    context('5x5 board', () => {
      it('will return true if 5 in a row are sloping upward', () => {
        const state = ['O', 'X', ' ', 'X', 'O',
                       'X', 'X', 'X', 'O', 'X',
                       ' ', 'X', 'O', 'O', ' ',
                       'O', 'O', 'X', 'X', ' ',
                       'O', 'X', 'O', 'O', 'X']

        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isTrue(outcome.didWinDiagonally(board, 'O'))
      })

      it('will return false if no 5 in a row are sloping', () => {
        const state = ['O', 'X', ' ', 'X', 'O',
                       'X', 'X', 'X', 'O', 'X',
                       ' ', 'X', 'X', 'O', ' ',
                       'O', 'O', 'X', 'X', ' ',
                       'O', 'X', 'O', 'O', 'X']

        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isFalse(outcome.didWinDiagonally(board, 'O'))
      })
    })

    context('7x7 board', () => {
      it('will return true if 7 in a row are sloping downward', () => {
        const state = ['O', 'X', ' ', 'X', 'O', 'X', 'O',
                       'X', 'O', 'X', 'O', 'X', ' ', 'O',
                       ' ', 'X', 'O', 'O', ' ', 'X', 'X',
                       'O', 'O', 'X', 'O', ' ', 'X', 'O',
                       'X', 'X', 'O', 'O', 'O', 'X', 'O',
                       'O', ' ', 'O', ' ', 'X', 'O', ' ',
                       'O', 'X', 'O', 'O', 'X', 'X', 'O']

        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isTrue(outcome.didWinDiagonally(board, 'O'))
      })

      it('will return false if no 7 in a row are sloping', () => {
        const state = ['O', 'X', ' ', 'X', 'O', 'X', 'O',
                       'X', 'O', 'X', 'O', 'X', ' ', 'O',
                       ' ', 'X', ' ', 'O', ' ', 'X', 'X',
                       'O', 'O', 'X', 'O', ' ', 'X', 'O',
                       'X', 'X', 'O', 'O', 'O', 'X', 'O',
                       'O', ' ', 'O', ' ', 'X', 'O', ' ',
                       'O', 'X', 'O', 'O', 'X', 'X', 'O']

        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isFalse(outcome.didWinDiagonally(board, 'O'))
      })
    })
  })

  describe('#didWinHorizontally', () => {
    context('3x3 board', () => {
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

    context('5x5 board', () => {
      it('can return true when given board, marker, and 5 in a row on any row', () => {
        const state = ['O', 'O', 'X', 'O', 'O',
                       'X', 'X', 'X', 'O', 'X',
                       ' ', 'X', ' ', 'O', ' ',
                       'O', 'O', 'O', 'O', 'O',
                       'O', 'X', 'O', 'O', 'X']

        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isTrue(outcome.didWinHorizontally(board, 'O'))
      })

      it('can return false when given board, marker, and no 5 in a row on any row', () => {
        const state = ['O', 'O', 'X', 'O', 'O',
                       'X', 'X', 'X', 'O', 'X',
                       ' ', 'X', 'O', 'O', ' ',
                       'O', 'X', 'O', 'O', 'O',
                       'O', 'X', 'O', 'O', 'X']

        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isFalse(outcome.didWinHorizontally(board, 'O'))
      })
    })

    context('7x7 board', () => {
      it('can return true when given board, marker, and 7 in a row on any row', () => {
        const state = ['O', 'X', ' ', 'X', 'O', 'X', 'O',
                       'X', ' ', 'X', 'O', 'X', ' ', 'O',
                       'O', 'O', 'O', 'O', 'O', 'O', 'O',
                       'O', 'O', 'X', 'O', ' ', 'X', 'O',
                       'X', 'X', 'O', 'O', 'O', 'X', 'O',
                       'O', 'X', ' ', ' ', 'X', 'O', ' ',
                       'O', 'X', 'O', 'O', 'X', 'X', 'O']

        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isTrue(outcome.didWinHorizontally(board, 'O'))
      })

      it('can return false when given board, marker, and no 7 in a row on any row', () => {
        const state = ['O', 'X', ' ', 'X', 'O', 'X', 'O',
                       'X', 'O', 'X', 'O', 'X', ' ', 'O',
                       'O', 'O', 'O', 'O', 'O', ' ', 'O',
                       'O', 'O', 'X', 'O', ' ', 'X', 'O',
                       'X', 'X', 'O', 'O', 'O', 'X', 'O',
                       'O', 'X', ' ', ' ', 'X', 'O', ' ',
                       'O', 'X', 'O', 'O', 'X', 'X', 'O']

        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isFalse(outcome.didWinHorizontally(board, 'O'))
      })
    })
  })

  describe('#didWinVertically', () => {
    context('3x3 board', () => {
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

    context('5x5 board', () => {
      it('can return true when given board, marker, and 5 in a row for given marker', () => {
        const state = ['O', 'O', 'X', 'O', 'O',
                       'X', 'O', 'X', 'O', 'X',
                       ' ', 'O', ' ', ' ', ' ',
                       'O', 'O', 'O', 'X', 'O',
                       'O', 'O', 'O', 'O', 'X']

        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isTrue(outcome.didWinVertically(board, 'O'))
      })

      it('can return false when given board, marker, and no 5 in a row for given marker', () => {
        const state = ['O', 'O', 'X', 'O', 'O',
                       'X', 'O', 'X', 'O', 'X',
                       ' ', 'X', ' ', ' ', ' ',
                       'O', 'O', 'O', 'X', 'O',
                       'O', 'O', 'O', 'O', 'X']

        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isFalse(outcome.didWinVertically(board, 'O'))
      })
    })

    context('7x7 board', () => {
      it('can return true when given board, marker, and 7 in a row for given marker', () => {
        const state = ['O', 'X', ' ', 'X', 'O', 'X', 'O',
                       'X', 'O', 'X', 'O', 'X', 'X', 'O',
                       'O', 'O', 'O', 'O', 'O', 'X', 'O',
                       'O', 'O', 'X', 'O', ' ', 'X', 'O',
                       'X', 'X', 'O', 'O', 'O', 'X', 'O',
                       'O', 'X', ' ', ' ', 'X', 'X', ' ',
                       'O', 'X', 'O', 'O', 'X', 'X', 'O']

        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isTrue(outcome.didWinVertically(board, 'X'))
      })

      it('can return false when given board, marker, and no 7 in a row for given marker', () => {
        const state = ['O', 'X', ' ', 'X', 'O', 'X', 'O',
                       'X', 'O', 'X', 'O', 'X', 'X', 'O',
                       'O', 'O', 'O', 'O', 'O', 'X', 'O',
                       'O', 'O', 'X', 'O', ' ', 'X', 'O',
                       'X', 'X', 'O', 'O', 'O', 'X', 'O',
                       'O', 'X', ' ', ' ', 'X', 'X', ' ',
                       'O', 'X', 'O', 'O', 'X', 'X', 'O']

        const board = new Board(state)
        const outcome = new Outcome(board.dimensions)

        assert.isFalse(outcome.didWinVertically(board, 'O'))
      })
    })
  })

  describe('#didWin', () => {
    context('3x3 board', () => {
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

    context('5x5 board', () => {
      context('5 in a row diagonally', () => {
        it('returns true', () => {
          const state = ['O', 'O', 'X', 'O', 'O',
                         'X', 'X', 'X', 'O', 'X',
                         ' ', 'X', 'O', ' ', ' ',
                         'O', 'O', 'O', ' ', 'O',
                         'O', 'X', 'O', 'O', 'X']

          const board = new Board(state)
          const outcome = new Outcome(board.dimensions)

          assert.isTrue(outcome.didWin(board, 'O'))
        })
      })

      context('5 in a row horizontally', () => {
        it('returns true', () => {
          const state = ['O', 'O', 'X', 'O', ' ',
                         'X', 'X', 'X', 'O', 'X',
                         ' ', 'X', 'X', ' ', ' ',
                         'O', 'O', 'O', 'O', 'O',
                         'X', 'X', 'O', 'O', 'X']

          const board = new Board(state)
          const outcome = new Outcome(board.dimensions)

          assert.isTrue(outcome.didWin(board, 'O'))
        })
      })

      context('5 in a row vertically', () => {
        it('returns true', () => {
          const state = ['O', 'O', 'X', 'O', ' ',
                         'X', 'X', 'X', 'O', 'X',
                         ' ', 'X', 'X', 'O', ' ',
                         'X', 'O', ' ', 'O', 'O',
                         'X', 'X', 'O', 'O', 'X']

          const board = new Board(state)
          const outcome = new Outcome(board.dimensions)

          assert.isTrue(outcome.didWin(board, 'O'))
        })
      })
    })

    context('7x7 board', () => {
      context('7 in a row diagonally', () => {
        it('returns true', () => {
          const state = ['X', 'X', ' ', 'X', 'O', 'X', 'O',
                         'X', 'O', 'X', 'O', 'X', 'O', 'O',
                         ' ', 'X', 'X', 'O', 'O', 'X', 'X',
                         'O', 'O', 'X', 'O', ' ', 'X', 'O',
                         'X', 'X', 'O', 'O', 'O', 'X', 'O',
                         'O', 'O', 'O', ' ', 'X', 'O', ' ',
                         'O', 'X', 'O', 'O', 'X', 'X', 'O']

          const board = new Board(state)
          const outcome = new Outcome(board.dimensions)

          assert.isTrue(outcome.didWin(board, 'O'))
        })
      })

      context('7 in a row horizontally', () => {
        it('returns true', () => {
          const state = ['X', 'X', ' ', 'X', 'O', 'X', 'O',
                         'O', 'O', 'O', 'O', 'O', 'O', 'O',
                         ' ', 'X', 'X', 'O', 'O', 'X', 'X',
                         'O', 'O', 'X', 'X', ' ', 'X', 'O',
                         'X', 'X', 'O', 'O', 'O', 'X', 'O',
                         'O', 'O', ' ', ' ', 'X', 'O', ' ',
                         ' ', 'X', 'O', 'O', 'X', 'X', 'O']

          const board = new Board(state)
          const outcome = new Outcome(board.dimensions)

          assert.isTrue(outcome.didWin(board, 'O'))
        })
      })

      context('7 in a row vertically', () => {
        it('returns true', () => {
          const state = ['X', 'X', 'O', 'X', 'O', 'X', 'O',
                         'O', 'X', 'O', ' ', 'O', ' ', 'O',
                         ' ', 'X', 'O', 'O', 'O', 'X', 'X',
                         'O', 'O', 'O', 'X', ' ', 'X', 'O',
                         'X', 'X', 'O', 'O', 'O', 'X', 'O',
                         'O', 'O', 'O', ' ', 'X', 'O', ' ',
                         ' ', 'X', 'O', 'O', 'X', 'X', 'O']

          const board = new Board(state)
          const outcome = new Outcome(board.dimensions)

          assert.isTrue(outcome.didWin(board, 'O'))
        })
      })
    })
  })

  describe('#isGameOver', () => {
    context('either player has won', () => {
      context('3x3 board', () => {
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

      context('5x5 board', () => {
        it('returns true if given marker has one', () => {
          const state = ['O', 'O', 'X', 'O', ' ',
                         'X', 'X', 'X', 'O', 'X',
                         ' ', 'X', 'X', 'O', ' ',
                         'X', 'O', ' ', 'O', 'O',
                         'X', 'X', 'O', 'O', 'X']

          const marker = 'O'
          const board = new Board(state)
          const outcome = new Outcome(board.dimensions)

          assert.isTrue(outcome.isGameOver(board, marker))
        })

        it('returns true if given marker has one', () => {
          const state = ['X', 'O', 'X', 'O', ' ',
                         'X', 'X', 'X', 'O', 'X',
                         ' ', 'X', 'X', 'O', ' ',
                         'X', 'O', ' ', 'X', 'O',
                         'X', 'X', 'O', 'O', 'X']

          const marker = 'X'
          const board = new Board(state)
          const outcome = new Outcome(board.dimensions)

          assert.isTrue(outcome.isGameOver(board, marker))
        })
      })
    })

    context('neither player has won and board is full', () => {
      context('3x3 board', () => {
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

      context('5x5 board', () => {
        it('returns true', () => {
          const state = ['X', 'O', 'X', 'O', 'X',
                         'X', 'X', 'X', 'O', 'X',
                         'O', 'X', 'O', 'O', 'X',
                         'X', 'O', 'O', 'X', 'O',
                         'X', 'X', 'O', 'O', 'O']

          const marker = 'X'
          const board = new Board(state)
          const outcome = new Outcome(board.dimensions)

          assert.isTrue(outcome.isGameOver(board, marker))
        })
      })
    })
  })
})
