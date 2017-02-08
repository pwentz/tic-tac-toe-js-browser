  // const Computer = require('../../computer')
  // const Outcome = require('../../outcome')
  // const Board = require('../../board')
  // const Game = require('../../game')
class Runner {
  setup() {
    const Computer = require('../../computer')
    const Outcome = require('../../outcome')
    const Board = require('../../board')
    const Game = require('../../game')
  }
}

const subscribeToEvents = () => {
  // const state = [' ',' ',' ',' ',' ',' ',' ',' ']
  // const board = new Board(state)
  // const computerMarker = 'X'
  // const userMarker = 'O'
  // const game = new Game({ board, markerOne: usermarker,
  //                                markerTwo: computerMarker })

  const submitButton = document.querySelector('#play-turn')

  // while(!Outcome.isGameOver(board, computerMarker) && !Outcome.isGameOver(board, userMarker)) {
    submitButton.addEventListener('click', (e) => {
      const textField = document.querySelector('input')
      const tableBody = document.querySelector('tbody')
      const totalSpaces = [...tableBody.children].reduce((result, node) => {
        return [...result, ...node.children]
      }, []).map(n => n.innerText)

      const nodes = [...document.querySelectorAll('td')]

      nodes[textField.value].innerText = 'X'
      console.log(totalSpaces)

      e.preventDefault()

      textField.value = ''
    })
  // }
}

subscribeToEvents()
