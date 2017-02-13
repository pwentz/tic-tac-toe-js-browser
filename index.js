const createDomActions = require('./app/domActions')
const createGameActions = require('./src/gameActions')

const ticTacToe = () => {
  const { logResults, getCanvas,
          showOrderSelection, hideOrderSelection,
          subscribeToOrderSelection,
          hideMarkerSettings, subscribeToMarkerSelection } = createDomActions(document)

  const { setMarkers, playUserTurn, playComputerTurn } = createGameActions(logResults)
  const canvas = getCanvas()

  const onMarkerSelection = (e) => {
    const userSelection = e.target.innerText
    setMarkers(userSelection)
    hideMarkerSettings()
    showOrderSelection()
  }

  const onOrderSelection = (e) => {
    hideOrderSelection()
    canvas.drawBoard()
  }

  const onUserDefer = (e) => {
    playComputerTurn()
     .then(({ marker, selection }) => {
        canvas.drawMarker(marker, selection)
     })
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

  subscribeToMarkerSelection('x', onMarkerSelection)
  subscribeToMarkerSelection('o', onMarkerSelection)
  subscribeToOrderSelection('yes', onOrderSelection)
  subscribeToOrderSelection('no', onOrderSelection)
  subscribeToOrderSelection('no', onUserDefer)
  canvas.onClick(play)
}

ticTacToe()
