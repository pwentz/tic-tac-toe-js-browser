const assert = require('chai').assert
const sinon = require('sinon')
const Board = require('../../src/board')
const MarkerFinder = require('../../src/markerFinder')

describe('MarkerFinder', () => {
  describe('#parseUpwardDiagonal', () => {
    let onWinningSetup, onGameOver

    beforeEach(() => {
      onWinningSetup = sinon.spy()
      onGameOver = sinon.spy()
    })

    context('3x3 board', () => {
      context('game is over', () => {
        it('runs the onGameOver argument', () => {
          const state = [' ', 'X', 'O',
                         ' ', 'O', 'X',
                         'O', 'O', 'X']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseUpwardDiagonal('O', onGameOver, onWinningSetup)

          assert.equal(onGameOver.callCount, 1)
          assert.deepEqual(onGameOver.args[0][0].positions, [6, 4, 2])
          assert.equal(onGameOver.args[0][0].marker, 'O')
          assert.isFalse(onWinningSetup.called)
        })
      })

      context('given marker can win', () => {
        it('runs the onWinningSetup argument', () => {
          const state = [' ', 'X', 'O',
                         ' ', ' ', 'X',
                         'O', 'O', 'X']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseUpwardDiagonal('O', onGameOver, onWinningSetup)

          assert.isTrue(onWinningSetup.calledOnce)
          assert.isFalse(onGameOver.called)
        })
      })

      context('no pattern', () => {
        it('will not call any of the functions it is passed', () => {
          const state = ['O', 'O', 'O',
                         'O', 'X', 'O',
                         'O', 'O', 'O']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseUpwardDiagonal('O', onGameOver, onWinningSetup)

          assert.isFalse(onWinningSetup.called)
          assert.isFalse(onGameOver.called)
        })
      })
    })

    context('5x5 board', () => {
      context('game is over', () => {
        it('will return the positions if 5 in a row are sloping upward', () => {
          const state = ['O', 'X', ' ', 'X', 'O',
                         'X', 'X', 'X', 'O', 'X',
                         ' ', 'X', 'O', 'O', ' ',
                         'O', 'O', 'X', 'X', ' ',
                         'O', 'X', 'O', 'O', 'X']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseUpwardDiagonal('O', onGameOver, onWinningSetup)

          assert.isTrue(onGameOver.called)
          assert.deepEqual(onGameOver.args[0][0].positions, [20, 16, 12, 8, 4])
        })
      })

      context('given marker can win', () => {
        it('will call onWinningSetup function', () => {
          const state = ['O', 'X', ' ', 'X', 'O',
                         'X', 'X', 'X', 'O', 'X',
                         ' ', 'X', 'O', 'O', ' ',
                         'O', ' ', 'X', 'X', ' ',
                         'O', 'X', 'O', 'O', 'X']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseUpwardDiagonal('O', onGameOver, onWinningSetup)

          assert.isFalse(onGameOver.called)
          assert.isTrue(onWinningSetup.calledOnce)
        })
      })
    })

    context('7x7 board', () => {
      context('given marker has won', () => {
        it('will call the onGameOver function and pass positions', () => {
          const state = ['O', 'X', ' ', 'X', 'O', 'X', 'O',
                         'X', 'X', 'X', 'O', 'X', 'O', 'O',
                         ' ', 'X', 'O', 'O', 'O', 'X', 'X',
                         'O', 'O', 'X', 'O', ' ', 'X', 'O',
                         'X', 'X', 'O', 'O', 'O', 'X', 'O',
                         'O', 'O', 'O', ' ', 'X', ' ', ' ',
                         'O', 'X', 'O', 'O', 'X', 'X', 'O']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseUpwardDiagonal('O', onGameOver, onWinningSetup)

          assert.isTrue(onGameOver.calledOnce)
          assert.deepEqual(onGameOver.args[0][0].positions, [42, 36, 30, 24, 18, 12, 6])
          assert.isFalse(onWinningSetup.called)
        })
      })

      context('given marker can win', () => {
        it('will call the onWinningSetup function', () => {
          const state = ['O', 'X', ' ', 'X', 'O', 'X', 'O',
                         'X', 'X', 'X', 'O', 'X', 'O', 'O',
                         ' ', 'X', 'O', 'O', 'O', 'X', 'X',
                         'O', 'O', 'X', 'O', ' ', 'X', 'O',
                         'X', 'X', ' ', 'O', 'O', 'X', 'O',
                         'O', 'O', 'O', ' ', 'X', ' ', ' ',
                         'O', 'X', 'O', 'O', 'X', 'X', 'O']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseUpwardDiagonal('O', onGameOver, onWinningSetup)

          assert.isTrue(onWinningSetup.calledOnce)
          assert.isFalse(onGameOver.called)
        })
      })
    })
  })

  describe('#parseDownwardDiagonal', () => {
    let onWinningSetup, onGameOver

    beforeEach(() => {
      onWinningSetup = sinon.spy()
      onGameOver = sinon.spy()
    })

    context('3x3 board', () => {
      context('game is over', () => {

        it('runs the onGameOver argument', () => {
          const state = ['O', 'X', ' ',
                         ' ', 'O', 'X',
                         'X', 'O', 'O']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseDownwardDiagonal('O', onGameOver, onWinningSetup)

          assert.equal(onGameOver.callCount, 1)
          assert.deepEqual(onGameOver.args[0][0].positions, [0, 4, 8])
          assert.equal(onGameOver.args[0][0].marker, 'O')
          assert.isFalse(onWinningSetup.called)
        })
      })

      context('given marker can win', () => {
        it('runs the onWinningSetup argument', () => {
          const state = ['O', 'X', ' ',
                         ' ', 'O', 'X',
                         'X', ' ', ' ']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseDownwardDiagonal('O', onGameOver, onWinningSetup)

          assert.isTrue(onWinningSetup.calledOnce)
          assert.isFalse(onGameOver.called)
        })
      })

      context('no diagonal pattern', () => {
        it('will not call any of the functions it is passed', () => {
          const state = ['O', 'O', 'O',
                         'O', 'X', 'O',
                         'O', 'O', 'O']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseDownwardDiagonal('O', onGameOver, onWinningSetup)

          assert.isFalse(onWinningSetup.called)
          assert.isFalse(onGameOver.called)
        })
      })
    })

    context('5x5 board', () => {
      context('game is over', () => {
        it('will return the positions if 5 in a row are sloping upward', () => {
          const state = ['O', 'X', ' ', 'X', 'O',
                         'X', 'O', 'X', ' ', 'X',
                         ' ', 'X', 'O', 'O', ' ',
                         'O', ' ', 'X', 'O', ' ',
                         'X', 'X', 'O', 'O', 'O']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseDownwardDiagonal('O', onGameOver, onWinningSetup)

          assert.isTrue(onGameOver.called)
          assert.deepEqual(onGameOver.args[0][0].positions, [0, 6, 12, 18, 24])
        })
      })

      context('given marker can win', () => {
        it('will call onWinningSetup function', () => {
          const state = ['O', 'X', ' ', 'X', 'O',
                         'X', ' ', 'X', 'O', 'X',
                         ' ', 'X', 'O', 'O', ' ',
                         'O', ' ', 'X', 'O', ' ',
                         ' ', 'X', 'O', 'X', 'O']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseDownwardDiagonal('O', onGameOver, onWinningSetup)

          assert.isFalse(onGameOver.called)
          assert.isTrue(onWinningSetup.calledOnce)
        })
      })
    })

    context('7x7 board', () => {
      context('given marker has won', () => {
        it('will call the onGameOver function and pass positions', () => {
          const state = ['O', 'X', ' ', 'X', 'O', 'X', 'O',
                         'X', 'O', 'X', 'O', 'X', ' ', 'O',
                         ' ', 'X', 'O', 'O', 'O', 'X', 'X',
                         'O', 'O', 'X', 'O', ' ', 'X', 'O',
                         'X', 'X', 'O', 'O', 'O', 'X', 'O',
                         'O', ' ', 'O', ' ', 'X', 'O', ' ',
                         'O', 'X', 'O', 'O', 'X', 'X', 'O']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseDownwardDiagonal('O', onGameOver, onWinningSetup)

          assert.isTrue(onGameOver.calledOnce)
          assert.deepEqual(onGameOver.args[0][0].positions, [0, 8, 16, 24, 32, 40, 48])
          assert.isFalse(onWinningSetup.called)
        })
      })

      context('given marker can win', () => {
        it('will call the onWinningSetup function', () => {
          const state = ['O', 'X', ' ', 'X', 'O', 'X', 'O',
                         'X', 'O', 'X', 'O', 'X', ' ', 'O',
                         ' ', 'X', ' ', 'O', 'O', 'X', 'X',
                         'O', 'O', 'X', 'O', ' ', 'X', 'O',
                         'X', 'X', 'O', 'O', 'O', 'X', 'O',
                         'O', ' ', 'O', ' ', 'X', 'O', ' ',
                         'O', 'X', 'O', 'O', 'X', 'X', 'O']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseDownwardDiagonal('O', onGameOver, onWinningSetup)

          assert.isTrue(onWinningSetup.calledOnce)
          assert.isFalse(onGameOver.called)
        })
      })
    })
  })

  describe('#parseHorizontal', () => {
    let onWinningSetup, onGameOver

    beforeEach(() => {
      onWinningSetup = sinon.spy()
      onGameOver = sinon.spy()
    })

    context('3x3 board', () => {
      context('given marker has won', () => {
        it('runs the onGameOver argument', () => {
          const state = [' ', 'X', 'X',
                         ' ', ' ', 'X',
                         'O', 'O', 'O']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseHorizontal('O', onGameOver, onWinningSetup)

          assert.equal(onGameOver.callCount, 1)
          assert.deepEqual(onGameOver.args[0][0].positions, [6, 7, 8])
          assert.isFalse(onWinningSetup.called)
        })
      })

      context('given marker can win', () => {
        it('runs the onWinningSetup function', () => {
          const state = [' ', 'X', 'O',
                         'O', ' ', 'O',
                         'X', 'O', 'X']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseHorizontal('O', onGameOver, onWinningSetup)

          assert.isTrue(onWinningSetup.calledOnce)
          assert.isFalse(onGameOver.called)
        })
      })

      context('no diagonal pattern', () => {
        it('will not call any of the functions it is passed', () => {
          const state = ['O', 'X', 'O',
                         'O', 'X', 'O',
                         'O', 'X', 'O']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseHorizontal('O', onGameOver, onWinningSetup)

          assert.isFalse(onWinningSetup.called)
          assert.isFalse(onGameOver.called)
        })
      })
    })

    context('5x5 board', () => {
      context('given marker has won', () => {
        it('will run the onGameOver function', () => {
          const state = ['O', 'X', ' ', 'X', 'O',
                         'X', 'X', 'X', 'O', 'X',
                         ' ', 'X', 'O', 'O', ' ',
                         'O', 'O', 'O', 'O', 'O',
                         'O', 'X', 'O', 'O', 'X']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseHorizontal('O', onGameOver, onWinningSetup)

          assert.isTrue(onGameOver.calledOnce)
          assert.deepEqual(onGameOver.args[0][0].positions, [15, 16, 17, 18, 19])
        })
      })

      context('given marker can win', () => {
        it('will run the onWinningSetup function', () => {
          const state = ['O', 'X', ' ', 'X', 'O',
                         'X', 'X', 'X', 'O', 'X',
                         ' ', 'X', 'O', 'O', ' ',
                         'O', 'O', 'O', ' ', 'O',
                         'O', 'X', 'O', 'O', 'X']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseHorizontal('O', onGameOver, onWinningSetup)

          assert.isTrue(onWinningSetup.calledOnce)
          assert.isFalse(onGameOver.called)
        })
      })
    })

    context('7x7 board', () => {
      context('given marker has won', () => {
        it('calls the onGameOver function', () => {
          const state = ['O', 'X', ' ', 'X', 'O', 'X', 'O',
                         'X', 'O', 'X', 'O', 'X', ' ', 'O',
                         'O', 'O', 'O', 'O', 'O', 'O', 'O',
                         'O', 'O', 'X', 'O', ' ', 'X', 'O',
                         'X', 'X', 'O', 'O', 'O', 'X', 'O',
                         'O', ' ', 'O', ' ', 'X', 'O', ' ',
                         'O', 'X', 'O', 'O', 'X', 'X', 'O']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseHorizontal('O', onGameOver, onWinningSetup)

          assert.isTrue(onGameOver.calledOnce)
          assert.deepEqual(onGameOver.args[0][0].positions, [14, 15, 16, 17, 18, 19, 20])
          assert.isFalse(onWinningSetup.called)
        })
      })

      context('given marker can win', () => {
        it('calls the onWinningSetup function', () => {
          const state = ['O', 'X', ' ', 'X', 'O', 'X', 'O',
                         'X', 'O', 'X', 'O', 'X', ' ', 'O',
                         'O', 'O', 'O', 'O', ' ', 'O', 'O',
                         'O', 'O', 'X', 'O', ' ', 'X', 'O',
                         'X', 'X', 'O', 'O', 'O', 'X', 'O',
                         'O', ' ', 'O', ' ', 'X', 'O', ' ',
                         'O', 'X', 'O', 'O', 'X', 'X', 'O']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseHorizontal('O', onGameOver, onWinningSetup)

          assert.isTrue(onWinningSetup.calledOnce)
          assert.isFalse(onGameOver.called)
        })
      })
    })
  })

  describe('#parseVertical', () => {
    let onWinningSetup, onGameOver

    beforeEach(() => {
      onWinningSetup = sinon.spy()
      onGameOver = sinon.spy()
    })

    context('3x3 board', () => {
      context('given marker has won vertically', () => {
        it('runs the onGameOver function', () => {
          const state = ['O', 'X', ' ',
                         'O', ' ', 'X',
                         'O', 'X', 'X']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseVertical('O', onGameOver, onWinningSetup)

          assert.isTrue(onGameOver.calledOnce)
          assert.deepEqual(onGameOver.args[0][0].positions, [0, 3, 6])
          assert.isFalse(onWinningSetup.called)
        })
      })

      context('given marker can win vertically', () => {
        it('runs the onWinningSetup function', () => {
          const state = ['O', 'X', ' ',
                         ' ', ' ', 'X',
                         'O', 'X', 'X']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseVertical('O', onGameOver, onWinningSetup)

          assert.isTrue(onWinningSetup.calledOnce)
          assert.isFalse(onGameOver.called)
        })
      })

      context('no pattern vertically', () => {
        it('runs neither function', () => {
          const state = [' ', 'X', ' ',
                         ' ', ' ', ' ',
                         'O', 'X', 'X']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseVertical('O', onGameOver, onWinningSetup)

          assert.isFalse(onWinningSetup.called)
          assert.isFalse(onGameOver.called)
        })
      })
    })

    context('5x5 board', () => {
      context('given marker has won vertically', () => {
        it('runs the onGameOver function', () => {
          const state = ['O', 'X', 'O', 'X', 'O',
                         'X', 'X', 'O', 'O', 'X',
                         ' ', 'X', 'O', 'O', ' ',
                         'O', 'O', 'O', ' ', 'O',
                         'O', 'X', 'O', 'O', 'X']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseVertical('O', onGameOver, onWinningSetup)

          assert.isTrue(onGameOver.calledOnce)
          assert.deepEqual(onGameOver.args[0][0].positions, [2, 7, 12, 17, 22])
          assert.isFalse(onWinningSetup.called)
        })
      })

      context('given marker can win vertically', () => {
        it('runs the onWinningSetup function', () => {
          const state = ['O', 'X', 'O', 'X', 'O',
                         'X', 'X', 'O', 'O', 'X',
                         ' ', 'X', 'O', 'O', ' ',
                         'O', 'O', 'O', ' ', 'O',
                         'O', 'X', ' ', 'O', 'X']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseVertical('O', onGameOver, onWinningSetup)

          assert.isFalse(onGameOver.called)
          assert.isTrue(onWinningSetup.calledOnce)
        })
      })
    })

    context('7x7 board', () => {
      context('given marker has won vertically', () => {
        it('runs the onGameOver function', () => {
          const state = ['O', 'X', ' ', 'O', 'O', 'X', 'O',
                         'X', 'X', 'X', 'O', 'X', 'O', 'O',
                         ' ', 'X', 'O', 'O', 'O', 'X', 'X',
                         'O', 'O', 'X', 'O', ' ', 'X', 'O',
                         'X', 'X', ' ', 'O', 'O', 'X', 'O',
                         'O', 'O', 'O', 'O', 'X', ' ', ' ',
                         'O', 'X', 'O', 'O', 'X', 'X', 'O']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseVertical('O', onGameOver, onWinningSetup)

          assert.isTrue(onGameOver.calledOnce)
          assert.deepEqual(onGameOver.args[0][0].positions, [3, 10, 17, 24, 31, 38, 45])
          assert.isFalse(onWinningSetup.called)
        })
      })

      context('given marker can win vertically', () => {
        it('runs the onWinningSetup function', () => {
          const state = ['O', 'X', ' ', 'O', 'O', 'X', 'O',
                         'X', 'X', 'X', 'O', 'X', 'O', 'O',
                         ' ', 'X', 'O', ' ', 'O', 'X', 'X',
                         'O', 'O', 'X', 'O', ' ', 'X', 'O',
                         'X', 'X', ' ', 'O', 'O', 'X', 'O',
                         'O', 'O', 'O', 'O', 'X', ' ', ' ',
                         'O', 'X', 'O', 'O', 'X', 'X', 'O']

          const board = new Board(state)
          const finder = new MarkerFinder(board)

          finder.parseVertical('O', onGameOver, onWinningSetup)

          assert.isFalse(onGameOver.called)
          assert.isTrue(onWinningSetup.calledOnce)
        })
      })
    })
  })
})
