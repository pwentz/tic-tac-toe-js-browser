const createDomActions = require('./app/domActions')
const createGameActions = require('./src/gameActions')

const ticTacToe = () => {
  const count = 9
  const { onGameOver, getSvgActions,
          showOrderSelection, hideOrderSelection,
          subscribeToOrderSelection,
          hideMarkerSettings, subscribeToMarkerSelection } = createDomActions(document)

  const { setMarkers, playUserTurn, playComputerTurn } = createGameActions(count, onGameOver, ticTacToe)
  const svg = getSvgActions()

  const onMarkerSelection = (selection) => {
    setMarkers(selection ? selection : 'O')
    hideMarkerSettings()
    showOrderSelection()
  }

  const onOrderSelection = (e) => {
    hideOrderSelection()
    svg.drawBoard()
  }

  const onUserDefer = (e) => {
    playComputerTurn()
     .then(({ marker, selection }) => {
        svg.drawWhiteMarker(marker, selection)
     })
  }

  const play = (e) => {
    e.preventDefault()

    const userSelection = svg.getCellNumber(e)

    playUserTurn(userSelection)
      .then(({ marker, selection }) => {
        svg.drawBlueMarker(marker, selection)

        return playComputerTurn()
      })
      .then(({ marker, selection }) => {
        svg.drawWhiteMarker(marker, selection)
      })
      .catch(() => {
        svg.unsubscribe(play)
      })
  }

  subscribeToMarkerSelection(onMarkerSelection)
  subscribeToOrderSelection('yes', onOrderSelection)
  subscribeToOrderSelection('no', onOrderSelection)
  subscribeToOrderSelection('no', onUserDefer)
  svg.onClick(play)
}

ticTacToe()
