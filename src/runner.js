const gameOptions = require('./setup')

const { game, board, isGameOver, cpu } = gameOptions(9)

module.exports = (ui) => {
  const userSettings = { }
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
        return ui.promptUserForTurn()
          .then((selection) => {
            board.addMarker(game.markerOne, selection)
            ui.drawMarkerOne(game.markerOne, selection)

            const userOutcome = isGameOver()

            if (userOutcome) {
              ui.onGameOver(userOutcome)
              return
            }

            const move = cpu.getMove(game)
            board.addMarker(cpu.marker, move)

            ui.drawMarkerTwo(cpu.marker, move)
            const cpuOutcome = isGameOver()

            if (cpuOutcome) {
              ui.onGameOver(cpuOutcome)
              return
            }
          })
      }
      else {
        const move = cpu.getMove(game)
        board.addMarker(cpu.marker, move)
        // check for game over

        ui.drawMarkerTwo(cpu.marker, move)

        const cpuOutcome = isGameOver()

        if (cpuOutcome) {
          ui.onGameOver(cpuOutcome)
          return
        }

        return ui.promptUserForTurn()
          .then((selection) => {
            board.addMarker(game.markerOne, selection)
            ui.drawMarkerOne(game.markerOne, selection)

            const userOutcome = isGameOver()

            if (userOutcome) {
              ui.onGameOver(userOutcome)
              return
            }
          })
      }
    })
    .catch(error => {
      console.log(error)
    })
}
