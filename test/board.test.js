const assert = require('chai').assert
const Board = require('../board')

describe('Board', () => {
  describe('#forks', () => {

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

      assert.sameDeepMembers(board.forks('X'), result)
    })
  })
})
