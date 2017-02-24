const assert = require('chai').assert
const Board = require('../../src/board')

describe('Board', () => {
  describe('#state', () => {
    it('has a state that represents the given array', () => {
      const originalState = [' ', ' ', ' ',
                             ' ', ' ', ' ',
                             ' ', ' ', ' ']
      const board = new Board(originalState)

      assert.sameDeepMembers(board.state, originalState)
    })

    it('has a state that does not reference original array', () => {
      const originalState = [' ', ' ', ' ',
                             ' ', ' ', ' ',
                             ' ', ' ', ' ']

      const board = new Board(originalState)
      originalState[0] = 'X'

      assert.notEqual(board.state[0], 'X')
    })
  })

  describe('#getForks', () => {

    it('returns all forks when passed a board state and a marker', () => {
      const originalBoard = ['X', 'O', 'X',
                             ' ', ' ', ' ',
                             'O', ' ', 'O']

      const forkedBoardOne = ['X', 'O', 'X',
                              'X', ' ', ' ',
                              'O', ' ', 'O']

      const forkedBoardTwo = ['X', 'O', 'X',
                              ' ', 'X', ' ',
                              'O', ' ', 'O']

      const forkedBoardThree = ['X', 'O', 'X',
                                ' ', ' ', 'X',
                                'O', ' ', 'O']

      const forkedBoardFour = ['X', 'O', 'X',
                               ' ', ' ', ' ',
                               'O', 'X', 'O']

      const board = new Board(originalBoard)

      const result = [new Board(forkedBoardOne), new Board(forkedBoardTwo),
                      new Board(forkedBoardThree), new Board(forkedBoardFour)]

      assert.sameDeepMembers(board.getForks('X'), result)
    })
  })

  describe('#addMarker', () => {
    context('position is available', () => {
      it('updates its board', () => {
        const state = ['X', 'O', 'X',
                       ' ', ' ', ' ',
                       'O', ' ', 'O']

        const board = new Board(state)
        const input = 4
        board.addMarker('O', input)

        assert.equal(board.state[input], 'O')
      })
    })

    context('position is taken', () => {
      it('does not update its state', () => {
        const state = ['X', ' ', ' ',
                       ' ', 'O', ' ',
                       ' ', ' ', 'X']

        const board = new Board(state)
        const invalidInput = 4

        board.addMarker('X', invalidInput)

        assert.equal(board.state[invalidInput], 'O')
      })
    })
  })
})
