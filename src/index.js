const Computer = require('./computer')
const Outcome = require('./outcome')
const Board = require('./board')
const Game = require('./game')

const subscribeToEvents = () => {

  const state = [' ', ' ', ' ',
                 ' ', ' ', ' ',
                 ' ', ' ', ' ']

  const board = new Board(state)
  const computerMarker = 'X'
  const userMarker = 'O'
  const computer = new Computer(computerMarker)
  const game = new Game({ board, markerOne: computerMarker,
                                 markerTwo: userMarker })

  const submitButton = document.querySelector('#play-turn')

  submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    if(!Outcome.isGameOver(board, computerMarker)) {
      const textField = document.querySelector('input')
      const tableBody = document.querySelector('tbody')

      const nodes = [...document.querySelectorAll('td')]
      nodes[textField.value].innerText = userMarker
      board.addMarker(userMarker, textField.value)

      if (Outcome.didWin(board, userMarker)) {
        console.log('user wins')
        return
      }

      if (Outcome.isGameOver(board, userMarker)) {
        console.log('tie!')
        return
      }

      const move = computer.getMove(game)

      board.addMarker(computerMarker, move)
      nodes[move].innerText = computerMarker

      if (Outcome.isGameOver(board, computerMarker)) {
        console.log('computer wins')
        return
      }

      if (Outcome.isGameOver(board, userMarker)) {
        console.log('tie!')
        return
      }

    }
    document.querySelector('input').value = ''
  })
}

subscribeToEvents()
