const markerDictionary = { X: 'O', O:'X' }
const setup = require('./setup')
const Computer = require('./computer')

module.exports = (endGameCallback) => {
  const computer = new Computer()
  const { game, board, isGameOver } = setup()

  const setMarkers = (chosenMarker) => {
    const computerMarker = markerDictionary[chosenMarker]

    game.markerOne = chosenMarker
    game.markerTwo = computerMarker
    computer.marker = computerMarker
  }

  const ifGameIsOver = (callback) => {
    const outcome = isGameOver()
    if (outcome) {
      callback(outcome)
    }
  }

  const playUserTurn = (cellNumber) => {
    const { markerOne } = game

    return new Promise((resolve, reject) => {
      if (isGameOver()) {
        reject()
      }
      else {
        board.addMarker(markerOne, cellNumber, () => {
          resolve({ marker: markerOne, selection: cellNumber })
          ifGameIsOver(endGameCallback)
        })
      }
    })
  }

  const playComputerTurn = () => {
    const { markerTwo } = game
    const move = computer.getMove(game)

    return new Promise((resolve, reject) => {
      if (isGameOver()) {
        reject()
      }
      else {
        board.addMarker(markerTwo, move, () => {
          resolve({ marker: markerTwo, selection: move })
          ifGameIsOver(endGameCallback)
        })
      }
    })
  }

  return {
    setMarkers,
    playUserTurn,
    playComputerTurn
  }
}
