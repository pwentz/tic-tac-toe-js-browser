const assert = require('chai').assert
const Minimax = require('../minimax')
const Outcome = require('../outcome')

describe('Minimax', () => {
  context('methods', () => {
    const minimax = new Minimax(Outcome)

    describe('#score', () => {
      context('end game scenario', () => {
        context('current marker & selected marker is in direct position to win diagonally', () => {
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

        context('current marker & selected marker is in direct position to win horizontally', () => {
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

        it('returns -10 if marker is in direct position to lose', () => {
          const board = ['X', 'O', 'O',
                         ' ', ' ', 'O',
                         ' ', 'O', 'X']

          assert.equal(minimax.score(board, 'X', 'O'), -10)
        })
      })
    })
  })
})
