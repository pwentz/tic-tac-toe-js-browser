const assert = require('chai').assert
const Outcome = require('../../src/outcome')
const Board = require('../../src/board')

describe('Outcome', () => {
  // describe('#didWinDiagonally', () => {
  //   context('3x3 board', () => {
  //     it('can return the positions when given board, marker, and 3 of them in a row sloping upward', () => {
  //       const state = [' ', 'X', 'O',
  //                      ' ', 'O', 'X',
  //                      'O', 'O', 'X']

  //       const board = new Board(state)
  //       const outcome = new Outcome(board.dimensions)
  //       const result =  [6, 4, 2]

  //       assert.deepEqual(outcome.didWinDiagonally(board, 'O'), result)
  //     })

  //     it('can return the positions when given board, marker, and 3 of them sloping downward', () => {
  //       const state = ['X', 'O', 'O',
  //                      'O', 'X', 'X',
  //                      'O', 'O', 'X']

  //       const board = new Board(state)
  //       const outcome = new Outcome(board.dimensions)
  //       const result =  [0, 4, 8]

  //       assert.deepEqual(outcome.didWinDiagonally(board, 'X'), result)
  //     })

  //     it('will return false when symbol does not have 3 in a row diagonally', () => {
  //       const state = ['O', 'O', 'O',
  //                      'O', 'X', 'O',
  //                      'O', 'O', 'O']

  //       const board = new Board(state)
  //       const outcome = new Outcome(board.dimensions)

  //       assert.isFalse(outcome.didWinDiagonally(board, 'O'))
  //     })
  //   })

  //   context('5x5 board', () => {
  //     it('will return the positions if 5 in a row are sloping upward', () => {
  //       const state = ['O', 'X', ' ', 'X', 'O',
  //                      'X', 'X', 'X', 'O', 'X',
  //                      ' ', 'X', 'O', 'O', ' ',
  //                      'O', 'O', 'X', 'X', ' ',
  //                      'O', 'X', 'O', 'O', 'X']

  //       const board = new Board(state)
  //       const outcome = new Outcome(board.dimensions)
  //       const result = [20, 16, 12, 8, 4]

  //       assert.deepEqual(outcome.didWinDiagonally(board, 'O'), result)
  //     })

  //     it('will return false if no 5 in a row are sloping', () => {
  //       const state = ['O', 'X', ' ', 'X', 'O',
  //                      'X', 'X', 'X', 'O', 'X',
  //                      ' ', 'X', 'X', 'O', ' ',
  //                      'O', 'O', 'X', 'X', ' ',
  //                      'O', 'X', 'O', 'O', 'X']

  //       const board = new Board(state)
  //       const outcome = new Outcome(board.dimensions)

  //       assert.isFalse(outcome.didWinDiagonally(board, 'O'))
  //     })
  //   })

  //   context('7x7 board', () => {
  //     it('will return the positions if 7 in a row are sloping downward', () => {
  //       const state = ['O', 'X', ' ', 'X', 'O', 'X', 'O',
  //                      'X', 'O', 'X', 'O', 'X', ' ', 'O',
  //                      ' ', 'X', 'O', 'O', ' ', 'X', 'X',
  //                      'O', 'O', 'X', 'O', ' ', 'X', 'O',
  //                      'X', 'X', 'O', 'O', 'O', 'X', 'O',
  //                      'O', ' ', 'O', ' ', 'X', 'O', ' ',
  //                      'O', 'X', 'O', 'O', 'X', 'X', 'O']

  //       const board = new Board(state)
  //       const outcome = new Outcome(board.dimensions)
  //       const result = [0, 8, 16, 24, 32, 40, 48]

  //       assert.deepEqual(outcome.didWinDiagonally(board, 'O'), result)
  //     })

  //     it('will return false if no 7 in a row are sloping', () => {
  //       const state = ['O', 'X', ' ', 'X', 'O', 'X', 'O',
  //                      'X', 'O', 'X', 'O', 'X', ' ', 'O',
  //                      ' ', 'X', ' ', 'O', ' ', 'X', 'X',
  //                      'O', 'O', 'X', 'O', ' ', 'X', 'O',
  //                      'X', 'X', 'O', 'O', 'O', 'X', 'O',
  //                      'O', ' ', 'O', ' ', 'X', 'O', ' ',
  //                      'O', 'X', 'O', 'O', 'X', 'X', 'O']

  //       const board = new Board(state)
  //       const outcome = new Outcome(board.dimensions)

  //       assert.isFalse(outcome.didWinDiagonally(board, 'O'))
  //     })
  //   })
  // })

  // describe('#didWinHorizontally', () => {
  //   context('3x3 board', () => {
  //     it('can return the positions when given board, marker, and 3 in a row on top row', () => {
  //       const state = ['O', 'O', 'O',
  //                      'X', 'X', 'X',
  //                      'X', 'X', 'X']

  //       const board = new Board(state)
  //       const outcome = new Outcome(board.dimensions)
  //       const result = [0, 1, 2]

  //       assert.deepEqual(outcome.didWinHorizontally(board, 'O'), result)
  //     })

  //     it('can return the positions when given board, marker, and 3 in a row on middle row', () => {
  //         const state = ['X', 'X', 'X',
  //                        'O', 'O', 'O',
  //                        'X', 'X', 'X']

  //         const board = new Board(state)
  //         const outcome = new Outcome(board.dimensions)
  //         const result = [3, 4, 5]

  //         assert.deepEqual(outcome.didWinHorizontally(board, 'O'), result)
  //     })

  //     it('can return the positions when given board, marker, and 3 in a row on bottom row', () => {
  //         const state = ['X', 'G', 'M',
  //                        'O', 'N', 'O',
  //                        'X', 'X', 'X']

  //         const board = new Board(state)
  //         const outcome = new Outcome(board.dimensions)
  //         const result = [6, 7, 8]

  //         assert.deepEqual(outcome.didWinHorizontally(board, 'X'), result)
  //     })

  //     it('can return false when given board, marker, and no 3 in a row horizontally', () => {
  //         const state = ['X', 'O', 'O',
  //                        'O', 'X', 'O',
  //                        'O', 'X', 'X']

  //         const board = new Board(state)
  //         const outcome = new Outcome(board.dimensions)

  //         assert.isFalse(outcome.didWinHorizontally(board, 'X'))
  //     })

  //     it('can return false when given board, marker, and no 3 in a row for given marker', () => {
  //         const state = ['X', 'O', 'X',
  //                        'X', 'X', 'O',
  //                        'O', 'O', 'O']

  //         const board = new Board(state)
  //         const outcome = new Outcome(board.dimensions)

  //         assert.isFalse(outcome.didWinHorizontally(board, 'X'))
  //     })
  //   })

  //   context('5x5 board', () => {
  //     it('can return the positions when given board, marker, and 5 in a row on any row', () => {
  //       const state = ['O', 'O', 'X', 'O', 'O',
  //                      'X', 'X', 'X', ' ', 'X',
  //                      ' ', 'X', ' ', 'O', ' ',
  //                      'O', 'O', 'O', 'O', 'O',
  //                      'O', 'X', 'O', 'O', 'X']

  //       const board = new Board(state)
  //       const outcome = new Outcome(board.dimensions)
  //       const result = [15, 16, 17, 18, 19]

  //       assert.deepEqual(outcome.didWinHorizontally(board, 'O'), result)
  //     })

  //     it('can return false when given board, marker, and no 5 in a row on any row', () => {
  //       const state = ['O', 'O', 'X', 'O', 'O',
  //                      'X', 'X', 'X', 'O', 'X',
  //                      ' ', 'X', 'O', 'O', ' ',
  //                      'O', 'X', 'O', 'O', 'O',
  //                      'O', 'X', 'O', 'O', 'X']

  //       const board = new Board(state)
  //       const outcome = new Outcome(board.dimensions)

  //       assert.isFalse(outcome.didWinHorizontally(board, 'O'))
  //     })
  //   })

  //   context('7x7 board', () => {
  //     it('can return the positions when given board, marker, and 7 in a row on any row', () => {
  //       const state = ['O', 'X', ' ', 'X', 'O', 'X', 'O',
  //                      'X', ' ', 'X', 'O', 'X', ' ', 'O',
  //                      'O', 'O', 'O', 'O', 'O', 'O', 'O',
  //                      'O', 'O', 'X', 'O', ' ', 'X', 'O',
  //                      'X', 'X', 'O', 'O', 'O', 'X', 'O',
  //                      'O', 'X', ' ', ' ', 'X', 'O', ' ',
  //                      'O', 'X', 'O', 'O', 'X', 'X', 'O']

  //       const board = new Board(state)
  //       const outcome = new Outcome(board.dimensions)
  //       const result = [14, 15, 16, 17, 18, 19, 20]

  //       assert.deepEqual(outcome.didWinHorizontally(board, 'O'), result)
  //     })

  //     it('can return false when given board, marker, and no 7 in a row on any row', () => {
  //       const state = ['O', 'X', ' ', 'X', 'O', 'X', 'O',
  //                      'X', 'O', 'X', 'O', 'X', ' ', 'O',
  //                      'O', 'O', 'O', 'O', 'O', ' ', 'O',
  //                      'O', 'O', 'X', 'O', ' ', 'X', 'O',
  //                      'X', 'X', 'O', 'O', 'O', 'X', 'O',
  //                      'O', 'X', ' ', ' ', 'X', 'O', ' ',
  //                      'O', 'X', 'O', 'O', 'X', 'X', 'O']

  //       const board = new Board(state)
  //       const outcome = new Outcome(board.dimensions)

  //       assert.isFalse(outcome.didWinHorizontally(board, 'O'))
  //     })
  //   })
  // })

  // describe('#didWinVertically', () => {
  //   context('3x3 board', () => {
  //     it('can return the positions when given board, marker, and 3 in a row for given marker to the left', () => {
  //         const state = ['O', 'O', 'O',
  //                        'O', 'X', 'X',
  //                        'O', 'O', 'O']

  //         const board = new Board(state)
  //         const outcome = new Outcome(board.dimensions)
  //         const result = [0, 3, 6]

  //         assert.deepEqual(outcome.didWinVertically(board, 'O'), result)
  //     })

  //     it('can return the positions when given board, marker, and 3 in a row for given marker in middle', () => {
  //         const state = ['O', 'X', 'O',
  //                        'O', 'X', 'X',
  //                        'O', 'X', 'O']

  //         const board = new Board(state)
  //         const outcome = new Outcome(board.dimensions)
  //         const result = [1, 4, 7]

  //         assert.deepEqual(outcome.didWinVertically(board, 'X'), result)
  //     })

  //     it('can return the positions when given board, marker, and 3 in a row for given marker to the right', () => {
  //         const state = ['O', 'X', 'O',
  //                        'X', 'X', 'O',
  //                        'O', 'X', 'O']

  //         const board = new Board(state)
  //         const outcome = new Outcome(board.dimensions)
  //         const result = [2, 5, 8]

  //         assert.deepEqual(outcome.didWinVertically(board, 'O'), result)
  //     })

  //     it('can return false when given board, marker, and no 3 in a row for given marker', () => {
  //         const state = ['X', 'O', 'O',
  //                        'O', 'X', 'O',
  //                        'O', 'O', 'X']

  //         const board = new Board(state)
  //         const outcome = new Outcome(board.dimensions)
  //         assert.isFalse(outcome.didWinVertically(board, 'O'))
  //     })
  //   })

  //   context('5x5 board', () => {
  //     it('can return the positions when given board, marker, and 5 in a row for given marker', () => {
  //       const state = ['O', 'O', 'X', 'O', 'O',
  //                      'X', 'O', 'X', 'O', 'X',
  //                      ' ', 'O', ' ', ' ', ' ',
  //                      'O', 'O', 'O', 'X', 'O',
  //                      'O', 'O', 'O', 'O', 'X']

  //       const board = new Board(state)
  //       const outcome = new Outcome(board.dimensions)
  //       const result = [1, 6, 11, 16, 21]

  //       assert.deepEqual(outcome.didWinVertically(board, 'O'), result)
  //     })

  //     it('can return false when given board, marker, and no 5 in a row for given marker', () => {
  //       const state = ['O', 'O', 'X', 'O', 'O',
  //                      'X', 'O', 'X', 'O', 'X',
  //                      ' ', 'X', ' ', ' ', ' ',
  //                      'O', 'O', 'O', 'X', 'O',
  //                      'O', 'O', 'O', 'O', 'X']

  //       const board = new Board(state)
  //       const outcome = new Outcome(board.dimensions)

  //       assert.isFalse(outcome.didWinVertically(board, 'O'))
  //     })
  //   })

  //   context('7x7 board', () => {
  //     it('can return the positions when given board, marker, and 7 in a row for given marker', () => {
  //       const state = ['O', 'X', ' ', 'X', 'O', 'X', 'O',
  //                      'X', 'O', 'X', 'O', 'X', 'X', 'O',
  //                      'O', 'O', 'O', 'O', 'O', 'X', 'O',
  //                      'O', 'O', 'X', 'O', ' ', 'X', 'O',
  //                      'X', 'X', 'O', 'O', 'O', 'X', 'O',
  //                      'O', 'X', ' ', ' ', 'X', 'X', ' ',
  //                      'O', 'X', 'O', 'O', 'X', 'X', 'O']

  //       const board = new Board(state)
  //       const outcome = new Outcome(board.dimensions)
  //       const result = [5, 12, 19, 26, 33, 40, 47]

  //       assert.deepEqual(outcome.didWinVertically(board, 'X'), result)
  //     })

  //     it('can return false when given board, marker, and no 7 in a row for given marker', () => {
  //       const state = ['O', 'X', ' ', 'X', 'O', 'X', 'O',
  //                      'X', 'O', 'X', 'O', 'X', 'X', 'O',
  //                      'O', 'O', 'O', 'O', 'O', 'X', 'O',
  //                      'O', 'O', 'X', 'O', ' ', 'X', 'O',
  //                      'X', 'X', 'O', 'O', 'O', 'X', 'O',
  //                      'O', 'X', ' ', ' ', 'X', 'X', ' ',
  //                      'O', 'X', 'O', 'O', 'X', 'X', 'O']

  //       const board = new Board(state)
  //       const outcome = new Outcome(board.dimensions)

  //       assert.isFalse(outcome.didWinVertically(board, 'O'))
  //     })
  //   })
  // })

  // describe('#didWin', () => {
  //   context('3x3 board', () => {
  //     context('3 in a row diagonally', () => {
  //       it('can return the positions', () => {
  //         const state = ['X', 'O', 'O',
  //                        'O', 'X', 'O',
  //                        'O', 'O', 'X']

  //         const board = new Board(state)
  //         const outcome = new Outcome(board.dimensions)
  //         const result = [0, 4, 8]

  //         assert.deepEqual(outcome.didWin(board, 'X'), result)
  //       })
  //     })

  //     context('3 in horizontally', () => {
  //       it('can return the positions', () => {
  //         const state = ['X', 'X', 'X',
  //                        'O', ' ', 'O',
  //                        'O', ' ', 'X']

  //         const board = new Board(state)
  //         const outcome = new Outcome(board.dimensions)
  //         const result = [0, 1, 2]

  //         assert.deepEqual(outcome.didWin(board, 'X'), result)
  //       })
  //     })

  //     context('3 in a row vertically', () => {
  //       it('can return the positions', () => {
  //         const state = ['O', 'X', 'X',
  //                        'O', 'X', 'O',
  //                        'O', ' ', 'X']

  //         const board = new Board(state)
  //         const outcome = new Outcome(board.dimensions)
  //         const result = [0, 3, 6]

  //         assert.deepEqual(outcome.didWin(board, 'O'), result)
  //       })
  //     })

  //     context('board is full, but no winner', () => {
  //       it('returns false', () => {
  //         const state = ['O', 'X', 'X',
  //                        'X', 'X', 'O',
  //                        'O', 'O', 'X']

  //         const board = new Board(state)
  //         const outcome = new Outcome(board.dimensions)

  //         assert.isFalse(outcome.didWin(board, 'X'))
  //       })
  //     })
  //   })

  //   context('5x5 board', () => {
  //     context('5 in a row diagonally', () => {
  //       it('returns the positions', () => {
  //         const state = ['O', 'O', 'X', 'O', 'O',
  //                        'X', 'X', 'X', 'O', 'X',
  //                        ' ', 'X', 'O', ' ', ' ',
  //                        'O', 'O', 'O', ' ', 'O',
  //                        'O', 'X', 'O', 'O', 'X']

  //         const board = new Board(state)
  //         const outcome = new Outcome(board.dimensions)
  //         const result = [20, 16, 12, 8, 4]

  //         assert.deepEqual(outcome.didWin(board, 'O'), result)
  //       })
  //     })

  //     context('5 in a row horizontally', () => {
  //       it('returns the positions', () => {
  //         const state = ['O', 'O', 'X', 'O', ' ',
  //                        'X', 'X', 'X', 'O', 'X',
  //                        ' ', 'X', 'X', ' ', ' ',
  //                        'O', 'O', 'O', 'O', 'O',
  //                        'X', 'X', 'O', 'O', 'X']

  //         const board = new Board(state)
  //         const outcome = new Outcome(board.dimensions)
  //         const result = [15, 16, 17, 18, 19]

  //         assert.deepEqual(outcome.didWin(board, 'O'), result)
  //       })
  //     })

  //     context('5 in a row vertically', () => {
  //       it('returns the positions', () => {
  //         const state = ['O', 'O', 'X', 'O', ' ',
  //                        'X', 'X', 'X', 'O', 'X',
  //                        ' ', 'X', 'X', 'O', ' ',
  //                        'X', 'O', ' ', 'O', 'O',
  //                        'X', 'X', 'O', 'O', 'X']

  //         const board = new Board(state)
  //         const outcome = new Outcome(board.dimensions)
  //         const result = [3, 8, 13, 18, 23]

  //         assert.deepEqual(outcome.didWin(board, 'O'), result)
  //       })
  //     })
  //   })

  //   context('7x7 board', () => {
  //     context('7 in a row diagonally', () => {
  //       it('returns the positions', () => {
  //         const state = ['X', 'X', ' ', 'X', 'O', 'X', 'O',
  //                        'X', 'O', 'X', 'O', 'X', 'O', 'O',
  //                        ' ', 'X', 'X', 'O', 'O', 'X', 'X',
  //                        'O', 'O', 'X', 'O', ' ', 'X', 'O',
  //                        'X', 'X', 'O', 'O', 'O', 'X', 'O',
  //                        'O', 'O', 'O', ' ', 'X', 'O', ' ',
  //                        'O', 'X', 'O', 'O', 'X', 'X', 'O']

  //         const board = new Board(state)
  //         const outcome = new Outcome(board.dimensions)
  //         const result = [42, 36, 30, 24, 18, 12, 6]

  //         assert.deepEqual(outcome.didWin(board, 'O'), result)
  //       })
  //     })

  //     context('7 in a row horizontally', () => {
  //       it('returns the positions', () => {
  //         const state = ['X', 'X', ' ', 'X', 'O', 'X', 'O',
  //                        'O', 'O', 'O', 'O', 'O', 'O', 'O',
  //                        ' ', 'X', 'X', 'O', 'O', 'X', 'X',
  //                        'O', 'O', 'X', 'X', ' ', 'X', 'O',
  //                        'X', 'X', 'O', 'O', 'O', 'X', 'O',
  //                        'O', 'O', ' ', ' ', 'X', 'O', ' ',
  //                        ' ', 'X', 'O', 'O', 'X', 'X', 'O']

  //         const board = new Board(state)
  //         const outcome = new Outcome(board.dimensions)
  //         const result = [7, 8, 9, 10, 11, 12, 13]

  //         assert.deepEqual(outcome.didWin(board, 'O'), result)
  //       })
  //     })

  //     context('7 in a row vertically', () => {
  //       it('returns the positions', () => {
  //         const state = ['X', 'X', 'O', 'X', 'O', 'X', 'O',
  //                        'O', 'X', 'O', ' ', 'O', ' ', 'O',
  //                        ' ', 'X', 'O', 'O', 'O', 'X', 'X',
  //                        'O', 'O', 'O', 'X', ' ', 'X', 'O',
  //                        'X', 'X', 'O', 'O', 'O', 'X', 'O',
  //                        'O', 'O', 'O', ' ', 'X', 'O', ' ',
  //                        ' ', 'X', 'O', 'O', 'X', 'X', 'O']

  //         const board = new Board(state)
  //         const outcome = new Outcome(board.dimensions)
  //         const result = [2, 9, 16, 23, 30, 37, 44]

  //         assert.deepEqual(outcome.didWin(board, 'O'), result)
  //       })
  //     })
  //   })
  // })

  // describe('#isGameOver', () => {
  //   context('either player has won', () => {
  //     context('3x3 board', () => {
  //       it('returns the positions if playerOne has won', () => {
  //         const state = ['X', 'O', 'O',
  //                        'O', 'X', 'O',
  //                        'O', 'O', 'X']

  //         const marker = 'X'
  //         const board = new Board(state)
  //         const outcome = new Outcome(board.dimensions)
  //         const result = [0, 4, 8]

  //         assert.deepEqual(outcome.isGameOver(board, marker), result)
  //       })

  //       it('returns the positions if playerTwo has won', () => {
  //         const state = ['X', 'O', 'X',
  //                        'O', ' ', 'X',
  //                        'O', 'O', 'O']

  //         const marker = 'O'
  //         const board = new Board(state)
  //         const outcome = new Outcome(board.dimensions)
  //         const result = [6, 7, 8]

  //         assert.deepEqual(outcome.isGameOver(board, marker), result)
  //       })
  //     })

  //     context('5x5 board', () => {
  //       it('returns the positions if given marker has one', () => {
  //         const state = ['O', 'O', 'X', 'O', ' ',
  //                        'X', 'X', 'X', 'O', 'X',
  //                        ' ', 'X', 'X', 'O', ' ',
  //                        'X', 'O', ' ', 'O', 'O',
  //                        'X', 'X', 'O', 'O', 'X']

  //         const marker = 'O'
  //         const board = new Board(state)
  //         const outcome = new Outcome(board.dimensions)
  //         const result = [3, 8, 13, 18, 23]

  //         assert.deepEqual(outcome.isGameOver(board, marker), result)
  //       })

  //       it('returns the positions if given marker has one', () => {
  //         const state = ['X', 'O', 'X', 'O', ' ',
  //                        'X', 'X', 'X', 'O', 'X',
  //                        ' ', 'X', 'X', 'O', ' ',
  //                        'X', 'O', ' ', 'X', 'O',
  //                        'X', 'X', 'O', 'O', 'X']

  //         const marker = 'X'
  //         const board = new Board(state)
  //         const outcome = new Outcome(board.dimensions)
  //         const result = [0, 6, 12, 18, 24]

  //         assert.deepEqual(outcome.isGameOver(board, marker), result)
  //       })
  //     })
  //   })

  //   context('neither player has won and board is full', () => {
  //     context('3x3 board', () => {
  //       it('returns true', () => {
  //         const state = ['X', 'O', 'X',
  //                        'O', 'X', 'X',
  //                        'N', 'O', 'O']

  //         const marker = 'O'
  //         const board = new Board(state)
  //         const outcome = new Outcome(board.dimensions)

  //         assert.isTrue(outcome.isGameOver(board, marker))
  //       })
  //     })

  //     context('5x5 board', () => {
  //       it('returns the true', () => {
  //         const state = ['X', 'O', 'X', 'O', 'X',
  //                        'X', 'X', 'X', 'O', 'X',
  //                        'O', 'X', 'O', 'O', 'X',
  //                        'X', 'O', 'O', 'X', 'O',
  //                        'X', 'X', 'O', 'O', 'O']

  //         const marker = 'X'
  //         const board = new Board(state)
  //         const outcome = new Outcome(board.dimensions)

  //         assert.isTrue(outcome.isGameOver(board, marker))
  //       })
  //     })
  //   })
  // })
})
