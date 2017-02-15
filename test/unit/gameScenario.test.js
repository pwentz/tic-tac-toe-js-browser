const assert = require('chai').assert
const GameScenario = require('../../src/gameScenario')
const Board = require('../../src/board')
const Game = require('../../src/game')

describe('GameScenario', () => {
  describe('#calculateScore', () => {
    it('has a higher score if position will win', () => {
      const board = ['O', ' ', 'X',
                     ' ', ' ', ' ',
                     ' ', ' ', 'O']

      const goodMoveCalc = new GameScenario(board, 4, 'O', 0)
      const badMoveCalc = new GameScenario(board, 5, 'O', 0)

      const game = new Game({ board: new Board(board),
                              markerOne: 'O',
                              markerTwo: 'X' })

      goodMoveCalc.calculateScore(game)
      badMoveCalc.calculateScore(game)

      assert.isAbove(goodMoveCalc.score, badMoveCalc.score)
    })

    it('has a higher score if position will block opponent', () => {
      const board = ['O', ' ', 'X',
                     ' ', ' ', ' ',
                     ' ', ' ', 'O']

      const goodMoveCalc = new GameScenario(board, 4, 'X', 0)
      const badMoveCalc = new GameScenario(board, 5, 'X', 0)

      const game = new Game({ board: new Board(board),
                              markerOne: 'O',
                              markerTwo: 'X' })

      goodMoveCalc.calculateScore(game)
      badMoveCalc.calculateScore(game)

      assert.isAbove(goodMoveCalc.score, badMoveCalc.score)
    })

    it('has a higher score if position will win than if position will block', () => {
      const board = ['X', ' ', 'X',
                     ' ', ' ', ' ',
                     'O', ' ', 'O']

      const goodMoveCalc = new GameScenario(board, 1, 'X', 0)
      const badMoveCalc = new GameScenario(board, 7, 'X', 0)

      const game = new Game({ board: new Board(board),
                              markerOne: 'O',
                              markerTwo: 'X' })

      goodMoveCalc.calculateScore(game)
      badMoveCalc.calculateScore(game)

      assert.isAbove(goodMoveCalc.score, badMoveCalc.score)
    })

    it('has a higher score if move can yield positive immediate results', () => {
      const immediateWinState = [' ', ' ', 'O',
                                 ' ', ' ', 'X',
                                 'O', ' ', 'X']

      const eventualWinState = [' ', ' ', ' ',
                                ' ', ' ', ' ',
                                ' ', ' ', ' ']

      const immediateWinCalc = new GameScenario(immediateWinState, 4, 'O', 0)
      const eventualWinCalc = new GameScenario(eventualWinState, 4, 'O', 0)

      const immediateWinGame = new Game({ board: new Board(immediateWinState),
                                          markerOne: 'O',
                                          markerTwo: 'X' })

      const eventualWinGame = new Game({ board: new Board(eventualWinState),
                                         markerOne: 'O',
                                         markerTwo: 'X' })

      immediateWinCalc.calculateScore(immediateWinGame)
      eventualWinCalc.calculateScore(eventualWinGame)

      assert.isAbove(immediateWinCalc.score, eventualWinCalc.score)
    })
  })

  describe('#calculateForks', () => {
    it('has a higher score on moves that block forking', () => {
        const board = [' ', ' ', ' ',
                       ' ', 'X', 'O',
                       ' ', 'O', ' ']

        const game = new Game({ board: new Board(board),
                                markerOne: 'O',
                                markerTwo: 'X' })

        const scoresByPosition = game.board.openSpaces.map(index => {
          const calc = new GameScenario(board, index, 'X', 0)
          calc.calculateScore(game)
          calc.calculateForks(game)
          return calc
        })

        const result = scoresByPosition.sort((a, b) => b.score > a.score)

        assert.equal(result[0].position, 8)
    })

    it('has a higher score on moves that block forking', () => {
        const board = [' ', ' ', ' ',
                       'O', 'X', ' ',
                       ' ', 'O', ' ']

        const game = new Game({ board: new Board(board),
                                markerOne: 'O',
                                markerTwo: 'X' })

        const scoresByPosition = game.board.openSpaces.map(index => {
          const calc = new GameScenario(board, index, 'X', 0)
          calc.calculateScore(game)
          calc.calculateForks(game)
          return calc
        })

        const result = scoresByPosition.sort((a, b) => b.score > a.score)

        assert.equal(result[0].position, 6)
    })
  })
})
