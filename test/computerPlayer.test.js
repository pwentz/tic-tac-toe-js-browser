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

        assert.isTrue(computer.didWinHorizontally(board, 'O'))
      })
    })

    it('can return true when given board, marker, and 3 in a row on middle row', () => {
        const board = ['X', 'X', 'X',
                       'O', 'O', 'O',
                       'X', 'X', 'X']

        assert.isTrue(computer.didWinHorizontally(board, 'O'))
    })

    it('can return true when given board, marker, and 3 in a row on bottom row', () => {
        const board = ['X', 'G', 'M',
                       'O', 'N', 'O',
                       'X', 'X', 'X']

        assert.isTrue(computer.didWinHorizontally(board, 'X'))
    })

    it('can return false when given board, marker, and no 3 in a row horizontally', () => {
        const board = ['X', 'O', 'O',
                       'O', 'X', 'O',
                       'O', 'X', 'X']

        assert.isFalse(computer.didWinHorizontally(board, 'X'))
    })

    it('can return false when given board, marker, and no 3 in a row for given marker', () => {
        const board = ['X', 'O', 'O',
                       'O', 'O', 'O',
                       'O', 'O', 'O']

        assert.isFalse(computer.didWinHorizontally(board, 'X'))
    })
  })
})
