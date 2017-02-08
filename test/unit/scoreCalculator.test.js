const assert = require('chai').assert
const ScoreCalculator = require('../../scoreCalculator')
const Board = require('../../board')

describe('ScoreCalculator', () => {
  describe('#calculateScore', () => {
    context('comparisons', () => {
      it('has a higher score if position will win', () => {
        const board = ['O', ' ', 'X',
                       ' ', ' ', ' ',
                       ' ', ' ', 'O']

        const goodMoveCalc = new ScoreCalculator(board, 4, 'O', 0)
        const badMoveCalc = new ScoreCalculator(board, 5, 'O', 0)

        goodMoveCalc.calculateScore()
        badMoveCalc.calculateScore()

        assert.isAbove(goodMoveCalc.score, badMoveCalc.score)
      })

      it('has a higher score if position will block opponent', () => {
        const board = ['O', ' ', 'X',
                       ' ', ' ', ' ',
                       ' ', ' ', 'O']

        const goodMoveCalc = new ScoreCalculator(board, 4, 'X', 0)
        const badMoveCalc = new ScoreCalculator(board, 5, 'X', 0)

        goodMoveCalc.calculateScore()
        badMoveCalc.calculateScore()

        assert.isAbove(goodMoveCalc.score, badMoveCalc.score)
      })

      it('has a higher score if position will win than if position will block', () => {
        const board = ['X', ' ', 'X',
                       ' ', ' ', ' ',
                       'O', ' ', 'O']

        const goodMoveCalc = new ScoreCalculator(board, 1, 'X', 0)
        const badMoveCalc = new ScoreCalculator(board, 7, 'X', 0)

        goodMoveCalc.calculateScore()
        badMoveCalc.calculateScore()

        assert.isAbove(goodMoveCalc.score, badMoveCalc.score)
      })

      it('has a higher score if move can yield positive immediate results', () => {
        const immediateWinState = [' ', ' ', 'O',
                                   ' ', ' ', 'X',
                                   'O', ' ', 'X']

        const eventualWinState = [' ', ' ', ' ',
                                  ' ', ' ', ' ',
                                  ' ', ' ', ' ']

        const immediateWinCalc = new ScoreCalculator(immediateWinState, 4, 'O', 0)
        const eventualWinCalc = new ScoreCalculator(eventualWinState, 4, 'O', 0)

        immediateWinCalc.calculateScore()
        eventualWinCalc.calculateScore()

        assert.isAbove(immediateWinCalc.score, eventualWinCalc.score)
      })
    })
  })

  describe('#calculateForks', () => {
    it('has a higher score on moves that block forking', () => {
        const board = [' ', ' ', ' ',
                       ' ', 'X', 'O',
                       ' ', 'O', ' ']

        const openings = board.reduce((res, m, index) => {
          if (m === ' ') return [...res, index]
            return res
        }, [])

        const scoresByPosition = openings.map(index => {
          const calc = new ScoreCalculator(board, index, 'X', 0)
          calc.calculateScore()
          calc.calculateForks()
          return calc
        })

        const result = scoresByPosition.sort((a, b) => b.score > a.score)

        assert.equal(result[0].position, 8)
    })

    it('has a higher score on moves that block forking', () => {
        const board = [' ', ' ', ' ',
                       'O', 'X', ' ',
                       ' ', 'O', ' ']

        const openings = board.reduce((res, m, index) => {
          if (m === ' ') return [...res, index]
            return res
        }, [])

        const scoresByPosition = openings.map(index => {
          const calc = new ScoreCalculator(board, index, 'X', 0)
          calc.calculateScore()
          calc.calculateForks()
          return calc
        })

        const result = scoresByPosition.sort((a, b) => b.score > a.score)

        assert.equal(result[0].position, 6)
    })
  })
})
