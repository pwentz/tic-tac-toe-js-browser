const gameOptions = require('./setup')

const { game, board, isGameOver, cpu } = gameOptions(9)

module.exports = (ui) => {

  const startUserTurn = () => {
    return new Promise((resolve, reject) => {
      return ui.promptUserForTurn(resolve)
    })
  }

  const playUserTurn = () => {
    return startUserTurn()
      .then((selection) => {
        return new Promise((resolve) => {
          board.addMarker(game.markerOne, selection)
          ui.drawMarkerOne(game.markerOne, selection)

          resolve()
        })
      })
  }

  const playCpuTurn = () => {
    return new Promise((resolve, reject) => {
      const move = cpu.getMove(game)
      board.addMarker(cpu.marker, move)
      ui.drawMarkerTwo(cpu.marker, move)

      resolve()
    })
  }

  const play = (playFirstPlayerTurn, playSecondPlayerTurn) => {
    playFirstPlayerTurn()
     .then(() => {
        const outcome = isGameOver()

        if (outcome) {
          ui.onGameOver(outcome)
          return
        }
        else {
          play(playSecondPlayerTurn, playFirstPlayerTurn)
        }
     })
  }

  ui.getMarkerSettings()
    .then(marker => {
      const cpuMarker = marker === 'X' ? 'O' : 'X'
      game.markerOne = marker
      game.markerTwo = cpuMarker
      cpu.marker = cpuMarker

      return ui.getOrderSettings()
    })
    .then(isUserGoingFirst => {
      ui.renderBoard()

      if (isUserGoingFirst.slice(0, 1) === 'y') {
        play(playUserTurn, playCpuTurn)
      }
      else {
        play(playCpuTurn, playUserTurn)
      }
    })
    .catch(error => {
      console.log(error)
    })
}
