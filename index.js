const createDomActions = require('./app/domActions')
const createGameActions = require('./src/gameActions')

const ticTacToe = () => {
  const { logResults, getCanvas,
          showOrderSelection, hideOrderSelection,
          subscribeToOrderSelection, hideTitle,
          hideMarkerSettings, subscribeToMarkerSelection } = createDomActions(document)

  const { setMarkers, playUserTurn, playComputerTurn } = createGameActions(logResults)
  const canvas = getCanvas()

  const onMarkerSelection = (e) => {
    console.log('TARGET:', e.target)
    const selection = document.querySelector('#marker-selection input').value
    setMarkers(selection)
    hideMarkerSettings()
    showOrderSelection()
  }

  const onOrderSelection = (e) => {
    hideOrderSelection()
    hideTitle()
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
