const assert = require('chai').assert
const Computer = require('../../src/computer')
const OutcomeFactory = require('../../src/outcomeFactory')
const Board = require('../../src/board')
const Game = require('../../src/game')
const createGameActions = require('../../src/gameActions')

describe('Game Simulation', function() {
  this.timeout(100000)

  context('3x3 board', () => {
    context('user goes first', () => {

      it('never loses to the user', () => {

        for(let i = 0 ; i < 100 ; i++) {
          const state = new Array(9).fill(' ')

          const board = new Board(state)
          const computerMarker = 'X'
          const computer = new Computer(computerMarker)
          const userMarker = 'O'
          const factory = new OutcomeFactory(board)
          let outcome = {}
          const game = new Game({ board, markerOne: computerMarker,
                                         markerTwo: userMarker })

          while(!outcome.isOver) {
            const randomPosition = board.openSpaces[Math.round(Math.random() * (board.openSpaces.length - 1))]

            board.addMarker(userMarker, randomPosition)

            console.log(board.state.slice(0,3))
            console.log(board.state.slice(3,6))
            console.log(board.state.slice(6,9))
            console.log('-----------')

            outcome = factory.getOutcome(userMarker)

            if (outcome.isOver) {
              break
            }

            const move = computer.getMove(game)

            board.addMarker(computerMarker, move)

            console.log(board.state.slice(0,3))
            console.log(board.state.slice(3,6))
            console.log(board.state.slice(6,9))
            console.log('-----------')

            outcome = factory.getOutcome(computerMarker)
          }
          console.log('GAME OVER')

          assert.isTrue(outcome.isOver &&
                         outcome.marker !== userMarker)
        }
      })
    })

    context('computer plays computer', () => {
      // it('is a tie everytime', () => {
      //   for(let i = 0 ; i < 100 ; i++) {

      //     const state = new Array(9).fill(' ')

      //     const board = new Board(state)
      //     const outcome = new Outcome(board.dimensions)
      //     const computerOneMarker = 'X'
      //     const computerOne = new Computer(computerOneMarker)
      //     const computerTwoMarker = 'O'
      //     const computerTwo = new Computer(computerTwoMarker)
      //     const game = new Game({ board, markerOne: computerOneMarker,
      //                                    markerTwo: computerTwoMarker })

      //     while(!outcome.isGameOver(board, computerTwoMarker)) {
      //       const computerOneMove = computerOne.getMove(game)

      //       board.addMarker(computerOneMarker, computerOneMove)

      //       if (outcome.isGameOver(board, computerOneMarker)) {
      //         break
      //       }

      //       const computerTwoMove = computerTwo.getMove(game)

      //       board.addMarker(computerTwoMarker, computerTwoMove)
      //     }

      //     assert.isFalse(outcome.didWin(board, computerOneMarker))
      //     assert.isFalse(outcome.didWin(board, computerTwoMarker))
      //   }
      // })
    })
  })

  context('5x5 board', () => {
    // context('user goes first', () => {
    //   it('never allows the user to win', () => {
    //     const state = new Array(25).fill(' ')

    //     const board = new Board(state)
    //     const computerMarker = 'X'
    //     const computer = new Computer(computerMarker)
    //     const userMarker = 'O'
    //     const outcome = new Outcome(board.dimensions)
    //     const game = new Game({ board, markerOne: computerMarker,
    //                                    markerTwo: userMarker })

    //     while(!outcome.isGameOver(board, computerMarker)) {
    //       const randomPosition = board.openSpaces[Math.round(Math.random() * (board.openSpaces.length - 1))]

    //       board.addMarker(userMarker, randomPosition)

    //       if (outcome.isGameOver(board, userMarker)) {
    //         break
    //       }

    //       const move = computer.getMove(game)

    //       board.addMarker(computerMarker, move)
    //     }

    //     assert.isFalse(outcome.didWin(board, userMarker))
    //   })
    // })
  })
})
