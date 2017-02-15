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

  describe('#topLeftCorner', () => {
    it('can return the top left corner index for a 3x3 board', () => {
      const dimensions = new BoardDimensions(3)

      assert.equal(dimensions.topLeftCorner, 0)
    })

    it('can return the top left corner index for a 5x5 board', () => {
      const dimensions = new BoardDimensions(5)

      assert.equal(dimensions.topLeftCorner, 0)
    })

    it('can return the top left corner index for a 7x7 board', () => {
      const dimensions = new BoardDimensions(7)

      assert.equal(dimensions.topLeftCorner, 0)
    })
  })

  describe('#topRightCorner', () => {
    it('can return the top right corner index for 3x3 board', () => {
      const dimensions = new BoardDimensions(3)

      assert.equal(dimensions.topRightCorner, 2)
    })

    it('can return the top right corner index for 5x5 board', () => {
      const dimensions = new BoardDimensions(5)

      assert.equal(dimensions.topRightCorner, 4)
    })

    it('can return the top right corner index for a 7x7 board', () => {
      const dimensions = new BoardDimensions(7)

      assert.equal(dimensions.topRightCorner, 6)
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
})
