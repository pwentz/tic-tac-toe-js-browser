const assert = require('chai').assert
const ScoreCalculator = require('../../scoreCalculator')

describe('ScoreCalculator', () => {
  describe('#calculateScore', () => {
    it('updates score if position given can win', () => {
      const board = [' ', 'O', 'X',
                     'O', ' ', ' ',
                     'X', 'O', ' ']

      const calc = new ScoreCalculator(board, 4, 'X')

      calc.calculateScore()

      assert.isAbove(calc.score, 0)
    })

    it('updates score if position given can lead to win', () => {
      const board = ['X', 'X', ' ',
                     'X', 'O', 'X',
                     ' ', ' ', 'O']

      const calc = new ScoreCalculator(board, 7, 'X')

      calc.calculateScore()

      assert.isAbove(calc.score, 0)
    })

    it('updates score if position given will lose', () => {
      const board = [' ', 'O', 'X',
                     'O', ' ', ' ',
                     'X', 'O', ' ']

      const calc = new ScoreCalculator(board, 8, 'X')

      calc.calculateScore()

      assert.isBelow(calc.score, 0)
    })

    it('updates score if position will eventually lead to win', () => {
      const board = ['X', ' ', 'X',
                     'X', 'O', 'O',
                     ' ', ' ', 'O']

      const calc = new ScoreCalculator(board, 7, 'X')

      calc.calculateScore()

      assert.isAbove(calc.score, 0)
    })


    it('updates score if position could eventually lead to loss', () => {
      const board = ['O', ' ', 'X',
                     ' ', 'O', 'O',
                     ' ', ' ', 'X']

      const calc = new ScoreCalculator(board, 6, 'X')

      calc.calculateScore()

      assert.isBelow(calc.score, 0)
    })

    context('comparisons', () => {
      it('has a higher score if position will block opponent', () => {
        const board = ['O', ' ', 'X',
                       ' ', ' ', ' ',
                       ' ', ' ', 'O']

        const goodMoveCalc = new ScoreCalculator(board, 4, 'X')
        const badMoveCalc = new ScoreCalculator(board, 5, 'X')

        goodMoveCalc.calculateScore()
        badMoveCalc.calculateScore()

        assert.isAbove(goodMoveCalc.score, badMoveCalc.score)
      })

      it('has a higher score on more strategic moves', () => {
        const board = [' ', ' ', ' ',
                       ' ', ' ', ' ',
                       ' ', ' ', ' ']

        const goodMoveCalc = new ScoreCalculator(board, 4, 'X')
        const badMoveCalc = new ScoreCalculator(board, 3, 'X')

        goodMoveCalc.calculateScore()
        badMoveCalc.calculateScore()

        assert.isAbove(goodMoveCalc.score, badMoveCalc.score)
      })
    })
  })
})
