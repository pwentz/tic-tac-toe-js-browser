const { coordsToCell, cellToCoords } = require('../src/util')
const createDomActions = require('./domActions')
const { showOrderSelection, hideOrderSelection,
        hideMarkerSettings, subscribeToOrderSelection,
        getSvgActions,
        subscribeToMarkerSelection } = createDomActions(document)

const svg = getSvgActions()

module.exports = class {
  constructor() {
    this.boardListener = false
  }

  promptUserForTurn(callback) {
    const onClick = (e) => {
      console.log('hit')
      const targetCellX = Math.floor(e.offsetX / 100) * 100
      const targetCellY = Math.floor(e.offsetY / 100) * 100

      svg.unsubscribe(onClick)
      return callback(coordsToCell(targetCellX, targetCellY))
    }

    svg.onClick(onClick)
  }

  onGameOver(result) {
    const { positions, message } = result
    const newText = document.createElement('p')
    newText.classList.add('result-text')
    newText.innerText = message
    document.querySelector('body').appendChild(newText)

    if (positions) {
      svg.applyResults(positions)
    }
    else {
      svg.startEndGameAnimations()
    }
  }

  drawMarker(marker, selection, color) {
    const { x, y } = cellToCoords(selection)

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')

    text.classList.add('marker')
    text.setAttribute('x', x + 40)
    text.setAttribute('y', y + 60)
    text.setAttribute('fill', color)

    const content = document.createTextNode(marker)
    text.appendChild(content)
    document.querySelector('#board').appendChild(text)
  }

  renderBoard() {
    hideOrderSelection()
    document.querySelector('#board').classList.remove('hide')
  }

  drawMarkerOne(marker, selection) {
    this.drawMarker(marker, selection, '#7CD3F9')
  }

  drawMarkerTwo(marker, selection) {
    this.drawMarker(marker, selection, 'white')
  }

  getMarkerSettings() {
    return new Promise((resolve) => {
      subscribeToMarkerSelection((marker) => {
        hideMarkerSettings()
        // document.querySelector('#marker-selection').classList.add('hide')
        showOrderSelection()
        //document.querySelector('#order-selection').classList.remove('hide')
        resolve(marker)
      })
    })
  }

  getOrderSettings() {
    return new Promise((resolve) => {
      const onSelection = (e) => {
        resolve(e.target.innerText)
      }

      subscribeToOrderSelection('yes', onSelection)
      subscribeToOrderSelection('no', onSelection)
    })
  }
}
