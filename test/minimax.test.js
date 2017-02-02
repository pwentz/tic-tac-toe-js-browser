const assert = require('chai').assert
const Minimax = require('../minimax')
const Outcome = require('../outcome')

describe('Minimax', () => {
  context('methods', () => {
    describe('#score', () => {
      context('end game scenario', () => {
        context('current marker === selected marker', () => {
          it('returns 10 if given marker is in position to win', () => {
            const board = ['X', 'O', 'O',
                           'X', ' ', 'O',
                           'O', 'O', 'X']

            assert.equal(Minimax.score(board, 'X', 'X'), 10)
          })
        })

        context('current marker !== selected marker', () => {
          it('returns -10 if non-given marker is in position to win', () => {
            const board = ['X', 'O', 'O',
                           'X', ' ', 'O',
                           'O', 'X', 'X']

            assert.equal(Minimax.score(board, 'X', 'O'), -10)
          })
        })
      })
    })
  })
})
