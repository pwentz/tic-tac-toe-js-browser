const { coordsToCell, cellToCoords } = require('../src/util')
const createDomActions = require('./domActions')
const { showOrderSelection, hideOrderSelection,
        hideMarkerSettings, subscribeToOrderSelection,
        getSvgActions,
        subscribeToMarkerSelection } = createDomActions(document)

const svg = getSvgActions()

module.exports = class {
  logWarning(message) {
    const existingWarning = document.querySelector('.warning-text')

    if (!existingWarning) {
      const newWarning = document.createElement('p')
      newWarning.innerText = message
      newWarning.classList.add('warning-text')
      document.querySelector('body').appendChild(newWarning)

      newWarning.addEventListener('animationend', () => {
        newWarning.remove()
      })
    }
  }

  logMessage(message) {
    const newText = document.createElement('p')
    newText.classList.add('result-text')
    newText.innerText = message
    document.querySelector('body').appendChild(newText)
  }

  promptUserForTurn(resolve) {
    const onClick = (e) => {
      const targetCellX = Math.floor(e.offsetX / 100) * 100
      const targetCellY = Math.floor(e.offsetY / 100) * 100

      svg.unsubscribe(onClick)
      resolve(coordsToCell(targetCellX, targetCellY))
    }

    svg.onClick(onClick)
  }

  onGameOver(result) {
    const { positions, message } = result
    this.logMessage(message)

    positions ? svg.applyResults(positions)
              : svg.startEndGameAnimations()
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
        showOrderSelection()
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
