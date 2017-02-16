const createDomActions = require('./app/domActions')
const createGameActions = require('./src/gameActions')

const ticTacToe = () => {
  const { onGameOver, getSvgActions,
          showOrderSelection, hideOrderSelection,
          subscribeToOrderSelection, subscribeToReplay,
          hideMarkerSettings, subscribeToMarkerSelection } = createDomActions(document)

  const { setMarkers, playUserTurn, playComputerTurn, replay } = createGameActions(onGameOver)
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
  subscribeToReplay(replay)
  svg.onClick(play)
}

ticTacToe()
