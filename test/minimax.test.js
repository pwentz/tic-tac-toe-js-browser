const assert = require('chai').assert
const Minimax = require('../minimax')
const Outcome = require('../outcome')

describe('Minimax', () => {
  context('methods', () => {
    const minimax = new Minimax(Outcome)

    describe('#score', () => {
      context('end game scenario', () => {
        context('current marker === selected marker', () => {
          context('marker is in direct position to win diagonally', () => {
            it('returns 10 if markers are sloping downward', () => {
              const board = ['X', 'O', 'O',
                             ' ', ' ', 'O',
                             ' ', 'O', 'X']

              assert.equal(minimax.score(board, 'X', 'X'), 10)
            })

            it('returns 10 if markers are sloping upwards', () => {
              const board = [' ', 'O', 'X',
                             ' ', ' ', 'O',
                             'X', 'O', 'X']

              assert.equal(minimax.score(board, 'X', 'X'), 10)
            })
          })

          context('marker in direct position to win horizontally', () => {
            it('returns 10 if markers are aligned on top row', () => {
              const board = ['X', ' ', 'X',
                             'O', ' ', 'O',
                             ' ', 'O', ' ']

              assert.equal(minimax.score(board, 'X', 'X'), 10)
            })

            it('returns 10 if markers are aligned on middle row', () => {
              const board = ['X', ' ', 'X',
                             'O', ' ', 'O',
                             ' ', 'O', 'X']

              assert.equal(minimax.score(board, 'O', 'O'), 10)
            })

            it('returns 10 if markers are aligned on bottom row', () => {
              const board = ['X', ' ', 'X',
                             'O', ' ', 'X',
                             'O', 'O', ' ']

              assert.equal(minimax.score(board, 'O', 'O'), 10)
            })
          })

          context('marker is in direct position to win vertically', () => {
            it('returns 10 if markers are aligned in left column', () => {
              const board = [' ', 'O', 'X',
                             'O', 'X', 'X',
                             'O', 'X', 'O']

              assert.equal(minimax.score(board, 'O', 'O'), 10)
            })

            it('returns 10 if markers are aligned in middle column', () => {
              const board = ['X', 'O', 'X',
                             'O', 'O', 'X',
                             'X', ' ', 'O']

              assert.equal(minimax.score(board, 'O', 'O'), 10)
            })

            it('returns 10 if markers are aligned in right column', () => {
              const board = ['X', 'O', 'X',
                             'O', 'X', ' ',
                             'X', 'O', 'X']

              assert.equal(minimax.score(board, 'X', 'X'), 10)
            })
          })
        })

        context('current marker !== selected marker', () => {
          context('selected marker is in position to lose diagonally', () => {
            it('returns -10 if current marker is in upward sloping position', () => {
              const board = ['X', ' ', 'O',
                             'X', ' ', 'O',
                             'O', 'O', 'X']

              assert.equal(minimax.score(board, 'X', 'O'), -10)
            })

            it('returns -10 if current marker is in downward sloping position', () => {
              const board = ['X', ' ', 'O',
                             'X', ' ', 'O',
                             'O', 'O', 'X']

              assert.equal(minimax.score(board, 'X', 'O'), -10)
            })
          })

          context('selected marker is in position to lose horizontally', () => {
            it('returns -10 if current marker is aligned on top row', () => {
              const board = ['O', ' ', 'O',
                             'X', 'X', 'O',
                             'O', 'O', 'X']

              assert.equal(minimax.score(board, 'X', 'O'), -10)
            })

            it('returns -10 if current marker is aligned on middle row', () => {
              const board = ['O', 'X', 'O',
                             ' ', 'O', 'O',
                             'O', 'O', 'X']

              assert.equal(minimax.score(board, 'X', 'O'), -10)
            })

            it('returns -10 if current marker is aligned on bottom row', () => {
              const board = ['O', 'X', 'O',
                             'X', ' ', 'X',
                             'O', 'O', ' ']

              assert.equal(minimax.score(board, 'X', 'O'), -10)
            })
          })

          context('selected marker is in position to lose vertically', () => {
            it('returns -10 if current marker is aligned in left column', () => {
              const board = ['O', 'X', 'O',
                             ' ', 'X', 'X',
                             'O', 'O', 'X']

              assert.equal(minimax.score(board, 'X', 'O'), -10)
            })

            it('returns -10 if current marker is aligned in middle column', () => {
              const board = ['O', 'O', 'X',
                             'X', 'O', 'O',
                             'X', ' ', 'X']

              assert.equal(minimax.score(board, 'X', 'O'), -10)
            })

            it('returns -10 if current marker is aligned in right column', () => {
              const board = ['O', 'X', ' ',
                             'X', 'O', 'O',
                             'X', 'X', 'O']

              assert.equal(minimax.score(board, 'X', 'O'), -10)
            })
          })
        })
      })
    })
  })
})
