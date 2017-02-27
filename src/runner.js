const createGameOptions = require('./setup')

module.exports = (ui, cellCount) => {
  let game, board, isGameOver, cpu

  const setup = () => {
    ui.setup(cellCount)
    const options = createGameOptions(cellCount)

    game = options.game
    board = options.board
    cpu = options.cpu
    isGameOver = options.isGameOver

    getSettings()
  }

  const getSettings = () => {
    return ui.getMarkerSettings()
      .then(marker => {
        const cpuMarker = marker.toLowerCase() === 'x' ? 'O' : 'X'
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
          const onReplay = setup

          ui.onGameOver(outcome, onReplay)
          return
        }

        play(playSecondPlayerTurn, playFirstPlayerTurn)
      })
      .catch((warning) => {
        ui.logWarning(warning)
        play(playFirstPlayerTurn, playSecondPlayerTurn)
      })
  }

  setup()
}
