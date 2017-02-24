const assert = require('chai').assert
const OutcomeFactory = require('../../src/outcomeFactory')
const Board = require('../../src/board')
const FinalOutcome = require('../../src/finalOutcome')
const ActionableOutcome = require('../../src/actionableOutcome')
const NullOutcome = require('../../src/nullOutcome')

describe('OutcomeFactory', () => {
  describe('#parseDiagonal', () => {
    // context('game is close to over', () => {
    //   const state = ['X', 'O', 'O',
    //                  ' ', ' ', 'O',
    //                  ' ', 'O', 'X']

    //   const parser = new OutcomeFactory(new Board(state))
    //   const outcome = parser.parseDiagonal('X')

    //   it('returns a ActionableOutcome object', () => {
    //     assert.instanceOf(outcome, ActionableOutcome)
    //   })

    //   it ('returns an outcome that gives us the marker we searched with', () => {
    //     assert.equal(outcome.marker, 'X')
    //   })

    //   it('returns an outcome that gives us the open position', () => {
    //     assert.equal(outcome.position, 4)
    //   })
    // })

    // context('game is over', () => {
    //   const state = ['O', 'O', 'X',
    //                  ' ', 'X', 'O',
    //                  'X', 'O', ' ']

    //   const parser = new OutcomeFactory(new Board(state))
    //   const outcome = parser.parseDiagonal('X')

    //   it('returns a FinalOutcome object', () => {
    //     assert.instanceOf(outcome, FinalOutcome)
    //   })

    //   it('returns an outcome with the marker', () => {
    //     assert.equal(outcome.marker, 'X')
    //   })

    //   it('returns the positions that the winning marker occupies', () => {
    //     assert.sameDeepMembers(outcome.positions, [2, 4, 6])
    //   })
    // })

    // context('game is far from over', () => {
    //   const state = new Array(9).fill(' ')

    //   const parser = new OutcomeFactory(new Board(state))
    //   const outcome = parser.parseDiagonal('X')

    //   it('returns an NullOutcome', () => {
    //     assert.instanceOf(outcome, NullOutcome)
    //   })
    // })
  })

  describe('#parseHorizontal', () => {
    // context('game is close to over', () => {
    //   const state = [' ', 'O', 'O',
    //                  ' ', 'X', 'O',
    //                  'X', ' ', 'X']

    //   const marker = 'X'
    //   const parser = new OutcomeFactory(new Board(state))
    //   const outcome = parser.parseHorizontal(marker)

    //   it('returns an ActionableOutcome object', () => {
    //     assert.instanceOf(outcome, ActionableOutcome)
    //   })

    //   it('ActionableOutcome contains marker', () => {
    //     assert.equal(outcome.marker, marker)
    //   })

    //   it('ActionableOutcome object contains winning position', () => {
    //     assert.equal(outcome.position, 7)
    //   })
    // })

    // context('game is over', () => {
    //   const state = ['X', 'X', 'X',
    //                  'O', ' ', ' ',
    //                  ' ', 'O', ' ']

    //   const marker = 'X'
    //   const parser = new OutcomeFactory(new Board(state))
    //   const outcome = parser.parseHorizontal(marker)

    //   it('returns a FinalOutcome', () => {
    //     assert.instanceOf(outcome, FinalOutcome)
    //   })

    //   it('returns a FinalOutcome instance that carries winningPositions', () => {
    //     assert.deepEqual(outcome.positions, [0, 1, 2])
    //   })

    //   it('returns a FinalOutcome instance that carries the marker', () => {
    //     assert.equal(outcome.marker, marker)
    //   })
    // })

    // context('game is far from over', () => {
    //   const state = new Array(9).fill(' ')

    //   const parser = new OutcomeFactory(new Board(state))
    //   const outcome = parser.parseHorizontal('X')

    //   it('returns an NullOutcome', () => {
    //     assert.instanceOf(outcome, NullOutcome)
    //   })
    // })
  })

  describe('#parseVertical', () => {
    // context('game is close to over', () => {
    //   const state = ['O', 'O', 'X',
    //                  ' ', ' ', 'X',
    //                  'O', ' ', ' ']

    //   const marker = 'X'
    //   const parser = new OutcomeFactory(new Board(state))
    //   const outcome = parser.parseVertical(marker)

    //   it('returns an ActionableOutcome', () => {
    //     assert.instanceOf(outcome, ActionableOutcome)
    //   })

    //   it('returns an ActionableOutcome that holds the winning position', () => {
    //     assert.equal(outcome.position, 8)
    //   })

    //   it('returns an ActionableOutcome that holds the marker', () => {
    //     assert.equal(outcome.marker, marker)
    //   })
    // })

    // context('game is over', () => {
    //   const state = ['X', 'O', 'O',
    //                  'X', ' ', 'O',
    //                  'X', ' ', ' ']

    //   const marker = 'X'
    //   const parser = new OutcomeFactory(new Board(state))
    //   const outcome = parser.parseVertical(marker)

    //   it('returns a FinalOutcome', () => {
    //     assert.instanceOf(outcome, FinalOutcome)
    //   })

    //   it('returns a FinalOutcome that points to the marker', () => {
    //     assert.equal(outcome.marker, marker)
    //   })

    //   it('returns a FinalOutcome that has winning positions', () => {
    //     assert.deepEqual(outcome.positions, [0, 3, 6])
    //   })
    // })

    // context('game is far from over', () => {
    //   const state = new Array(9).fill(' ')

    //   const parser = new OutcomeFactory(new Board(state))
    //   const outcome = parser.parseVertical('X')

    //   it('returns an NullOutcome', () => {
    //     assert.instanceOf(outcome, NullOutcome)
    //   })
    // })
  })

  describe('#getOutcome', () => {
    context('marker is in position to win diagonally', () => {
      const state = ['X', 'O', 'O',
                     ' ', ' ', 'O',
                     ' ', ' ', 'X']

      const marker = 'X'
      const factory = new OutcomeFactory(new Board(state))
      const outcome = factory.getOutcome(marker)

      it('returns ActionableOutcome', () => {
        assert.instanceOf(outcome, ActionableOutcome)
      })

      it('returns an ActionableOutcome with position matching the winning position', () => {
        assert.equal(outcome.position, 4)
      })
    })

    context('marker is in a position to win horizontally', () => {
      const state = [' ', 'O', 'O',
                     ' ', ' ', 'O',
                     ' ', 'X', 'X']

      const marker = 'X'
      const factory = new OutcomeFactory(new Board(state))
      const outcome = factory.getOutcome(marker)

      it('returns ActionableOutcome', () => {
        assert.instanceOf(outcome, ActionableOutcome)
      })

      it('returns an ActionableOutcome with position matching the winning position', () => {
        assert.equal(outcome.position, 6)
      })
    })

    context('marker is in a position to win vertically', () => {
      const state = ['O', ' ', 'O',
                     ' ', 'X', ' ',
                     'O', 'X', ' ']

      const marker = 'X'
      const factory = new OutcomeFactory(new Board(state))
      const outcome = factory.getOutcome(marker)

      it('returns ActionableOutcome', () => {
        assert.instanceOf(outcome, ActionableOutcome)
      })

      it('returns an ActionableOutcome with position matching the winning position', () => {
        assert.equal(outcome.position, 1)
      })
    })

    context('game is over and given marker is winner', () => {
      const state = ['O', 'X', 'O',
                     ' ', 'X', ' ',
                     'O', 'X', ' ']

      const marker = 'X'
      const factory = new OutcomeFactory(new Board(state))
      const outcome = factory.getOutcome(marker)

      it('returns a FinalOutcome', () => {
        assert.instanceOf(outcome, FinalOutcome)
      })

      it('returns a FinalOutcome that has the winning positions', () => {
        assert.deepEqual(outcome.positions, [1, 4, 7])
      })
    })

    context('game is over and given marker is not winner', () => {
      const state = ['O', 'X', 'O',
                     ' ', 'O', ' ',
                     'O', 'X', ' ']

      const marker = 'X'
      const factory = new OutcomeFactory(new Board(state))
      const outcome = factory.getOutcome(marker)

      it('returns a NullOutcome', () => {
        assert.instanceOf(outcome, NullOutcome)
      })
    })

    context('game is over and board is full', () => {
      const state = ['X', 'O', 'O',
                     'O', 'O', 'X',
                     'X', 'X', 'O']

      const marker = 'X'
      const factory = new OutcomeFactory(new Board(state))
      const outcome = factory.getOutcome(marker)

      it('returns a FinalOutcome', () => {
        assert.instanceOf(outcome, FinalOutcome)
      })

      it('returns a FinalOutcome with a null marker', () => {
        assert.isNull(outcome.marker)
      })

      it('returns a FinalOutcome with empty positions', () => {
        assert.equal(outcome.positions.length, 0)
      })
    })
  })

  // describe('#indexOfWinningPositionDiagonally', () => {
  //   context('3x3 board', () => {
  //     it('returns an open space if markers are sloping downward', () => {
  //       const state = ['X', 'O', 'O',
  //                      ' ', ' ', 'O',
  //                      ' ', 'O', 'X']

  //       const board = new Board(state)

  //       const parser = new BoardParser(board.dimensions)

  //       const result = parser.indexOfWinningPositionDiagonally(board, 'X')

  //       assert.equal(result, 4)
  //     })

  //     it('returns an open space if markers are sloping upwards', () => {
  //       const state = ['O', 'O', ' ',
  //                      ' ', 'X', 'O',
  //                      'X', 'O', 'X']

  //       const board = new Board(state)

  //       const parser = new BoardParser(board.dimensions)
  //       const result = parser.indexOfWinningPositionDiagonally(board, 'X')

  //       assert.equal(result, 2)
  //     })

  //     it('returns -1 if no markers are in position diagonally', () => {
  //       const state = ['O', 'O', 'X',
  //                      'X', ' ', 'X',
  //                      'O', 'O', 'X']

  //       const board = new Board(state)
  //       const parser = new BoardParser(board.dimensions)

  //       const result = parser.indexOfWinningPositionDiagonally(board, 'X')

  //       assert.equal(result, -1)
  //     })
  //   })

  //   context('5x5 board', () => {
  //     it('returns the open position if available', () => {
  //       const state = ['X', 'X', ' ', 'X', 'O',
  //                      'O', 'X', ' ', 'O', 'O',
  //                      ' ', ' ', 'X', 'O', ' ',
  //                      'O', 'O', 'X', ' ', ' ',
  //                      'O', 'X', 'O', 'O', 'X']

  //       const board = new Board(state)
  //       const parser = new BoardParser(board.dimensions)

  //       const result = parser.indexOfWinningPositionDiagonally(board, 'X')

  //       assert.equal(result, 18)
  //     })
  //   })

  //   context('7x7 board', () => {
  //     it('returns the open position if available', () => {
  //       const state = ['O', 'X', ' ', 'X', 'O', 'X', ' ',
  //                      'X', 'O', 'X', 'O', ' ', 'X', 'O',
  //                      ' ', 'X', ' ', 'O', 'X', ' ', 'X',
  //                      'O', 'O', ' ', 'X', ' ', 'O', 'O',
  //                      'X', ' ', 'X', 'O', ' ', 'X', 'O',
  //                      'O', 'X', 'O', ' ', 'X', 'O', ' ',
  //                      'X', 'X', 'O', 'O', 'X', ' ', 'X']

  //       const board = new Board(state)
  //       const parser = new BoardParser(board.dimensions)

  //       const result = parser.indexOfWinningPositionDiagonally(board, 'X')

  //       assert.equal(result, 6)
  //     })
  //   })
  // })

  // describe('#indexOfWinningPositionHorizontally', () => {
  //   context('3x3 board', () => {
  //     it('returns open space if markers are aligned on top row', () => {
  //       const state = ['X', ' ', 'X',
  //                      'X', ' ', 'O',
  //                      'O', 'O', ' ']

  //       const board = new Board(state)
  //       const parser = new BoardParser(board.dimensions)
  //       const result = parser.indexOfWinningPositionHorizontally(board, 'X')

  //       assert.strictEqual(result, 1)
  //     })

  //     it('returns open space if markers are aligned on middle row', () => {
  //       const state = ['X', ' ', 'X',
  //                      'O', 'O', ' ',
  //                      ' ', 'X', 'X']

  //       const board = new Board(state)
  //       const parser = new BoardParser(board.dimensions)

  //       const result = parser.indexOfWinningPositionHorizontally(board, 'O')

  //       assert.equal(result, 5)
  //     })

  //     it('returns open space if markers are aligned on bottom row', () => {
  //       const state = ['X', ' ', 'X',
  //                      'O', ' ', 'X',
  //                      ' ', 'O', 'O']

  //       const board = new Board(state)
  //       const parser = new BoardParser(board.dimensions)

  //       const result = parser.indexOfWinningPositionHorizontally(board, 'O')

  //       assert.equal(result, 6)
  //     })

  //     it('returns -1 if markers are not aligned horizonally', () => {
  //       const state = ['X', 'X', 'O',
  //                      'O', 'X', ' ',
  //                      'O', 'X', 'O']

  //       const board = new Board(state)
  //       const parser = new BoardParser(board.dimensions)

  //       const result = parser.indexOfWinningPositionHorizontally(board, 'O')

  //       assert.equal(result, -1)
  //     })
  //   })

  //   context('5x5 board', () => {
  //     it('returns the open space if available', () => {
  //       const state = ['X', 'X', ' ', 'X', 'O',
  //                      'O', 'O', 'O', ' ', 'O',
  //                      ' ', ' ', 'X', 'O', ' ',
  //                      'O', 'O', 'X', ' ', ' ',
  //                      'O', 'X', 'O', 'O', 'X']

  //       const board = new Board(state)
  //       const parser = new BoardParser(board.dimensions)

  //       const result = parser.indexOfWinningPositionHorizontally(board, 'O')

  //       assert.equal(result, 8)
  //     })
  //   })

  //   context('7x7 board', () => {
  //     it('returns the open space if available', () => {
  //       const state = ['O', 'X', ' ', 'X', 'O', 'X', ' ',
  //                      'X', 'O', 'X', 'O', ' ', 'X', 'O',
  //                      ' ', 'X', ' ', 'O', 'X', ' ', 'X',
  //                      'O', 'O', ' ', ' ', ' ', 'O', 'O',
  //                      'X', ' ', 'X', 'O', ' ', 'X', 'O',
  //                      'X', ' ', 'X', 'X', 'X', 'X', 'X',
  //                      'X', 'X', 'O', 'O', 'X', ' ', 'X']

  //       const board = new Board(state)
  //       const parser = new BoardParser(board.dimensions)

  //       const result = parser.indexOfWinningPositionHorizontally(board, 'X')

  //       assert.equal(result, 36)
  //     })
  //   })
  // })

  // describe('#indexOfWinningPositionVertically', () => {
  //   context('3x3 board', () => {
  //     it('returns the open space if markers are aligned in left column', () => {
  //       const state = ['O', 'O', 'X',
  //                      'O', 'X', 'X',
  //                      ' ', 'X', 'O']

  //       const board = new Board(state)
  //       const parser = new BoardParser(board.dimensions)

  //       const result = parser.indexOfWinningPositionVertically(board, 'O')

  //       assert.strictEqual(result, 6)
  //     })

  //     it('returns the open space if markers are aligned in middle column', () => {
  //       const state = ['X', ' ', 'X',
  //                      'O', 'O', 'X',
  //                      'X', 'O', 'O']

  //       const board = new Board(state)
  //       const parser = new BoardParser(board.dimensions)

  //       const result = parser.indexOfWinningPositionVertically(board, 'O')

  //       assert.strictEqual(result, 1)
  //     })

  //     it('returns the open space if markers are aligned in right column', () => {
  //       const state = ['X', 'O', 'X',
  //                      'O', 'X', ' ',
  //                      'X', 'O', 'X']

  //       const board = new Board(state)
  //       const parser = new BoardParser(board.dimensions)

  //       const result = parser.indexOfWinningPositionVertically(board, 'X')


  //       assert.equal(result, 5)
  //     })

  //     it('returns -1 if markers are not aligned vertically', () => {
  //       const state = ['X', 'X', 'X',
  //                      'O', 'O', 'O',
  //                      'X', 'X', 'X']

  //       const board = new Board(state)
  //       const parser = new BoardParser(board.dimensions)

  //       const result = parser.indexOfWinningPositionVertically(board, 'X')

  //       assert.equal(result, -1)
  //     })
  //   })

  //   context('5x5 board', () => {
  //     it('returns the open position if available', () => {
  //       const state = ['X', 'X', ' ', 'X', 'O',
  //                      'O', 'X', 'O', ' ', 'O',
  //                      ' ', ' ', 'X', 'O', ' ',
  //                      'O', 'X', 'X', ' ', ' ',
  //                      'O', 'X', 'O', 'O', 'X']

  //       const board = new Board(state)
  //       const parser = new BoardParser(board.dimensions)

  //       const result = parser.indexOfWinningPositionVertically(board, 'X')

  //       assert.equal(result, 11)
  //     })
  //   })

  //   context('7x7 board', () => {
  //     it('returns the open position if available', () => {
  //       const state = ['O', 'X', ' ', 'X', 'O', 'X', ' ',
  //                      'X', 'O', 'X', 'O', 'O', 'X', 'O',
  //                      ' ', 'X', ' ', 'O', 'O', ' ', 'X',
  //                      'O', 'O', ' ', ' ', 'O', 'O', 'O',
  //                      'X', ' ', 'X', 'O', ' ', 'X', 'O',
  //                      'X', ' ', ' ', 'X', 'O', 'X', 'X',
  //                      'X', 'X', 'O', 'O', 'O', ' ', 'X']

  //       const board = new Board(state)
  //       const parser = new BoardParser(board.dimensions)

  //       const result = parser.indexOfWinningPositionVertically(board, 'O')

  //       assert.equal(result, 32)
  //     })
  //   })
  // })

  // describe('#indexOfWinningPosition', () => {
  //   context('returns the index of position of any winning scenario', () => {
  //     context('3x3 board', () => {
  //       it('can return a position for a diagonal victory', () => {
  //         const state = ['X', 'O', 'X',
  //                        'O', 'X', 'O',
  //                        'O', ' ', ' ']

  //         const board = new Board(state)
  //         const parser = new BoardParser(board.dimensions)

  //         const result = parser.indexOfWinningPosition(board, 'X')

  //         assert.equal(result, 8)
  //       })

  //       it('can return a position for a horizontal victory', () => {
  //         const state = [' ', 'O', 'X',
  //                        ' ', 'O', 'O',
  //                        'X', 'X', ' ']

  //         const board = new Board(state)
  //         const parser = new BoardParser(board.dimensions)

  //         const result = parser.indexOfWinningPosition(board, 'O')

  //         assert.equal(result, 3)
  //       })

  //       it('can return a position for a vertical victory', () => {
  //         const state = [' ', 'O', ' ',
  //                        ' ', 'X', 'O',
  //                        'X', 'X', 'O']

  //         const board = new Board(state)
  //         const parser = new BoardParser(board.dimensions)

  //         const result = parser.indexOfWinningPosition(board, 'O')

  //         assert.equal(result, 2)
  //       })

  //       it('returns -1 if there are no positions to win', () => {
  //         const state = ['X', ' ', ' ',
  //                        ' ', 'O', ' ',
  //                        'X', ' ', ' ']

  //         const board = new Board(state)
  //         const parser = new BoardParser(board.dimensions)

  //         const result = parser.indexOfWinningPosition(board, 'O')

  //         assert.equal(result, -1)
  //       })
  //     })

  //     context('5x5 board', () => {
  //       it('returns position if available', () => {
  //         const state = ['X', 'X', ' ', 'X', 'O',
  //                        'O', ' ', 'O', ' ', 'O',
  //                        ' ', ' ', 'X', 'O', ' ',
  //                        'O', ' ', 'X', 'X', ' ',
  //                        'O', 'X', 'O', 'O', 'X']

  //         const board = new Board(state)
  //         const parser = new BoardParser(board.dimensions)

  //         const result = parser.indexOfWinningPosition(board, 'X')

  //         assert.equal(result, 6)
  //       })
  //     })

  //     context('7x7 board', () => {
  //       it('returns position if available', () => {
  //         const state = ['O', 'X', ' ', 'X', 'O', 'X', ' ',
  //                        'X', 'O', 'X', 'O', ' ', 'X', 'O',
  //                        ' ', 'X', ' ', 'O', ' ', ' ', 'X',
  //                        'O', 'O', 'O', ' ', 'O', 'O', 'O',
  //                        'X', ' ', 'X', 'O', ' ', 'X', 'O',
  //                        'X', ' ', ' ', 'X', 'O', 'X', 'X',
  //                        'X', 'X', 'O', 'O', 'O', ' ', 'X']

  //         const board = new Board(state)
  //         const parser = new BoardParser(board.dimensions)

  //         const result = parser.indexOfWinningPosition(board, 'O')

  //         assert.equal(result, 24)
  //       })
  //     })
  //   })
  // })
})
