const assert = require('chai').assert
const BoardDimensions = require('../../src/boardDimensions')

describe('BoardDimensions', () => {
  describe('#center', () => {
    it('can return the center index for a 3x3 board', () => {
      const dimensions = new BoardDimensions(3)

      assert.equal(dimensions.center, 4)
    })

    it('can return the center index for a 5x5 board', () => {
      const dimensions = new BoardDimensions(5)

      assert.equal(dimensions.center, 12)
    })

    it('can return the center index for a 7x7 board', () => {
      const dimensions = new BoardDimensions(7)

      assert.equal(dimensions.center, 24)
    })
  })

  describe('#downwardDiagonals', () => {
    context('3x3 board', () => {
      it('returns an array of indices from top left to bottom right', () => {
        const dimensions = new BoardDimensions(3)

        const result = [0, 4, 8]

        assert.deepEqual(result, dimensions.downwardDiagonals)
      })
    })

    context('5x5 board', () => {
      it('returns an array of indices from top left to bottom right', () => {
        const dimensions = new BoardDimensions(5)

        const result = [0, 6, 12, 18, 24]

        assert.deepEqual(result, dimensions.downwardDiagonals)
      })
    })

    context('7x7 board', () => {
      it('returns an array of indices from top left to bottom right', () => {
        const dimensions = new BoardDimensions(7)

        const result = [0, 8, 16, 24, 32, 40, 48]

        assert.deepEqual(result, dimensions.downwardDiagonals)
      })
    })
  })

  describe('#upwardDiagonals', () => {
    context('3x3 board', () => {
      it('returns an array of indices from bottom left to top right', () => {
        const dimensions = new BoardDimensions(3)

        const result = [6, 4, 2]

        assert.deepEqual(result, dimensions.upwardDiagonals)
      })
    })

    context('5x5 board', () => {
      it('returns an array of indices from bottom left to top right', () => {
        const dimensions = new BoardDimensions(5)

        const result = [20, 16, 12, 8, 4]

        assert.deepEqual(result, dimensions.upwardDiagonals)
      })
    })

    context('7x7 board', () => {
      it('returns an array of indices from bottom left to top right', () => {
        const dimensions = new BoardDimensions(7)

        const result = [42, 36, 30, 24, 18, 12, 6]

        assert.deepEqual(result, dimensions.upwardDiagonals)
      })
    })
  })

  describe('#column', () => {
    context('3x3 board', () => {
      it('takes a index and returns an array of indices in that column', () => {
        const dimensions = new BoardDimensions(3)

        const result = [2, 5, 8]

        assert.deepEqual(dimensions.column(2), result)
      })

      it('takes a index and returns an array of indices in that column', () => {
        const dimensions = new BoardDimensions(3)

        const result = [0, 3, 6]

        assert.deepEqual(dimensions.column(0), result)
      })
    })

    context('5x5 board', () => {
      it('takes an index and returns an array of indices in that column', () => {
        const dimensions = new BoardDimensions(5)

        const result = [1, 6, 11, 16, 21]

        assert.deepEqual(dimensions.column(1), result)
      })

      it('takes an index and returns an array of indices in that column', () => {
        const dimensions = new BoardDimensions(5)

        const result = [3, 8, 13, 18, 23]

        assert.deepEqual(dimensions.column(3), result)
      })
    })

    context('7x7 board', () => {
      it('takes an index and returns an array of indices in that column', () => {
        const dimensions = new BoardDimensions(7)

        const result = [4, 11, 18, 25, 32, 39, 46]

        assert.deepEqual(dimensions.column(4), result)
      })
    })

    context('index is not top of column', () => {
      it('returns that rest of indices in column starting with given indices', () => {
        const dimensions = new BoardDimensions(5)

        const result = [11, 16, 21]

        assert.deepEqual(dimensions.column(11), result)
      })

      it('returns that rest of indices in column starting with given indices', () => {
        const dimensions = new BoardDimensions(3)

        assert.deepEqual(dimensions.column(8), [8])
      })
    })
  })

  describe('#row', () => {
    context('3x3 board', () => {
      it('takes an index and returns rest of indices in row', () => {
        const dimensions = new BoardDimensions(3)

        const result = [6, 7, 8]

        assert.deepEqual(dimensions.row(6), result)
      })

      it('takes an index and returns rest of indices in row', () => {
        const dimensions = new BoardDimensions(3)

        const result = [3, 4, 5]

        assert.deepEqual(dimensions.row(3), result)
      })
    })

    context('5x5 board', () => {
      it('takes an index and returns rest of indices in row', () => {
        const dimensions = new BoardDimensions(5)

        const result = [5, 6, 7, 8, 9]

        assert.deepEqual(dimensions.row(5), result)
      })

      it('takes an index and returns rest of indices in row', () => {
        const dimensions = new BoardDimensions(5)

        const result = [0, 1, 2, 3, 4]

        assert.deepEqual(dimensions.row(0), result)
      })
    })

    context('7x7 board', () => {
      it('takes an index and returns rest of indices in row', () => {
        const dimensions = new BoardDimensions(7)

        const result = [21, 22, 23, 24, 25, 26, 27]

        assert.deepEqual(dimensions.row(21), result)
      })

      it('takes an index and returns rest of indices in row', () => {
        const dimensions = new BoardDimensions(7)

        const result = [0, 1, 2, 3, 4, 5, 6]

        assert.deepEqual(dimensions.row(0), result)
      })
    })

    context('index is not at beginning of row', () => {
      it('returns all indices to the right of index', () => {
        const dimensions = new BoardDimensions(5)

        const result = [7, 8, 9]

        assert.deepEqual(dimensions.row(7), result)
      })
    })
  })
})
