const createDomActions = require('./app/domActions')
const createGameActions = require('./src/gameActions')

const ticTacToe = () => {
  const { onGameOver, getSvgActions,
          showOrderSelection, hideOrderSelection,
          subscribeToOrderSelection,
          hideMarkerSettings, subscribeToMarkerSelection } = createDomActions(document)

  const { setMarkers, playUserTurn, playComputerTurn } = createGameActions(onGameOver)
  const svg = getSvgActions()

  const onMarkerSelection = (e) => {
    if (e.keyCode === 13) {
      const selection = e.target.value.slice(0, 1)
      setMarkers(selection ? selection : 'O')
      hideMarkerSettings()
      showOrderSelection()
    }
  }

  const onOrderSelection = (e) => {
    hideOrderSelection()
    svg.drawBoard()
  }

  const onUserDefer = (e) => {
    playComputerTurn()
     .then(({ marker, selection }) => {
        svg.drawMarker(marker, selection)
     })
  }

  const play = (e) => {
    e.preventDefault()

    const userSelection = svg.getCellNumber(e)

    playUserTurn(userSelection)
      .then(({ marker, selection }) => {
        svg.drawMarker(marker, selection)

        return playComputerTurn()
      })
      .then(({ marker, selection }) => {
        svg.drawMarker(marker, selection)
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
