const createDomActions = require('./app/domActions')
const createGameActions = require('./src/gameActions')

const ticTacToe = () => {
  const { logResults, getCanvas,
          hideMarkerSettings, subscribeToMarkerSelection } = createDomActions(document)

  const { setMarkers, playUserTurn, playComputerTurn } = createGameActions(logResults)
  const canvas = getCanvas()

  const onMarkerSelection = (e) => {
    setMarkers(e.target.innerText)
    hideMarkerSettings()
    canvas.drawBoard()
  }

  const play = (e) => {
    e.preventDefault()

    const userSelection = canvas.getCellNumber(e)

    playUserTurn(userSelection)
      .then(({ marker, selection }) => {
        canvas.drawMarker(marker, selection)

        return playComputerTurn()
      })
      .then(({ marker, selection }) => {
        canvas.drawMarker(marker, selection)
      })
      .catch(() => {
        canvas.unsubscribe(play)
      })
  }

  subscribeToMarkerSelection(onMarkerSelection)
  canvas.onClick(play)
}

ticTacToe()
