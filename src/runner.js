const gameOptions = require('./setup')

const { game, board, isGameOver, cpu } = gameOptions(9)

module.exports = (ui) => {
  const playUserTurn = () => {
    return new Promise((resolve, reject) => {
      return ui.promptUserForTurn(resolve)
    })
    .then(selection => {
      return board.addMarker(game.markerOne, selection)
    })
    .then(selection => {
      ui.drawMarkerOne(game.markerOne, selection)
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

        play(playSecondPlayerTurn, playFirstPlayerTurn)
      })
      .catch((warning) => {
        ui.logWarning(warning)
        play(playFirstPlayerTurn, playSecondPlayerTurn)
      })
  }

  const setup = () => {
    ui.setup()
    getSettings()
  }

  const getSettings = () => {
    return ui.getMarkerSettings()
      .then(marker => {
        const cpuMarker = marker === 'X' ? 'O' : 'X'
        game.markerOne = marker
        game.markerTwo = cpuMarker
        cpu.marker = cpuMarker

        return getOrder()
      })
      .catch(warning => {
        getSettings()
      })
  }

  const getOrder = () => {
    return ui.getOrderSettings()
      .then(isUserGoingFirst => {
        ui.renderBoard()
        setOrderAndPlay(isUserGoingFirst.slice(0, 1))
      })
      .catch(warning => {
        getOrder()
      })
  }

  const setOrderAndPlay = (truncatedResponse) => {
    if (truncatedResponse === 'y') {
      play(playUserTurn, playCpuTurn)
    }
    else {
      play(playCpuTurn, playUserTurn)
    }
  }

  setup()
}
