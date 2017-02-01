const assert = require('chai').assert
const ComputerPlayer = require('../computerPlayer')

describe('ComputerPlayer', () => {

  context('attributes', () => {
    it('gets self property from constructor object', () => {
      const computer = new ComputerPlayer({ self: 'X' })

      assert.equal(computer.self, 'X')
    })

    it('gets opponent property from constructor object', () => {
      const computer = new ComputerPlayer({ opponent: 'O' })

      assert.equal(computer.opponent, 'O')
    })
  })

  context('methods', () => {
    const computer = new ComputerPlayer({ self: 'X', opponent: 'O' })
    describe('#openSpaces', () => {
      it('can return the index open spaces when passed board', () => {
        const board = ['', 'X', '', '', 'O']
        assert.deepEqual(computer.openSpaces(board), [0, 2, 3])
      })
    })

    describe('#didWinDiagonally', () => {
      it('can return true when given board, marker, and 3 of them in a row sloping upward', () => {
        const board = ['', 'X', 'O',
                       '', 'O', 'X',
                       'O', 'O', 'X']
        assert.equal(computer.didWinDiagonally(board, 'O'), true)
      })

      it('can return true when given board, marker, and 3 of them sloping downward', () => {
        const board = ['X', 'O', 'O',
                       'O', 'X', 'X',
                       'O', 'O', 'X']
        assert.equal(computer.didWinDiagonally(board, 'X'), true)
      })

      it('will return false when symbol does not have 3 in a row diagonally', () => {
        const board = ['O', 'O', 'O',
                       'O', 'X', 'O',
                       'O', 'O', 'O']

        assert.equal(computer.didWinDiagonally(board, 'O'), false)
      })
    })

    describe('#didWinHorizontally', () => {
      it('can return true when given board, marker, and 3 in a row on top row', () => {
        const board = ['O', 'O', 'O',
                       'X', 'X', 'X',
                       'X', 'X', 'X']

        assert.equal(computer.didWinHorizontally(board, 'O'), true)
      })
    })

    describe('#calculateMinimaxScore', () => {
      // it('can return 10 if in position to win', () => {
      //   const board = ['', 'X', '',
      //                  '', 'O', 'X',
      //                  '', 'O', 'X']

      //   const minimaxScore = computer.calculateMinimaxScore(board)

      //   assert.equal(minimaxScore, 10)
      // })

      // it('can return -10 if in position to lose', () => {
      //   const board = ['O', 'O', '',
      //                  '', 'X', 'O',
      //                  '', 'X', 'O']

      //   const minimaxScore = computer.calculateMinimaxScore(board)

      //   assert.equal(minimaxScore, -10)
      // })
    })
  })
})
