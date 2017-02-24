const { coordsToCell, cellToCoords } = require('../src/util')
const domSetup = require('./domSetup')
const createDomActions = require('./domActions')
const createSvgActions = require('./svgActions')

module.exports = class {
  constructor() {
    this.svg = null
  }

  setup() {
    domSetup(document)
    this.svg = createSvgActions(document)
  }

  changeCursorToPointer() {
    document.body.style.cursor = 'pointer'
  }

  changeCursorToDefault() {
    document.body.style.cursor = 'default'
  }

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

      this.svg.unsubscribe(onClick)
      resolve(coordsToCell(targetCellX, targetCellY))
    }

    this.svg.onClick(onClick)
  }

  onGameOver(result, onReplay) {
    const { positions, message } = result
    this.logMessage(message)

    positions ? this.svg.applyResults(positions)
              : this.svg.startEndGameAnimations()

    document.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        // console.log('hit')
        // document.querySelector('body').innerHTML = ''
        // onReplay()
      }
    })
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
    // hideOrderSelection
    document.querySelector('#order-selection').classList.add('hide')
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
      const input = document.querySelector('#marker-selection input')
      const startButton = document.querySelector('.start-button')

      const callback = (marker) => {
        // hideMarkerSettings
        document.querySelector('#marker-selection').classList.add('hide')
        // showOrderSelection
        document.querySelector('#order-selection').classList.remove('hide')
        resolve(marker)
      }

      input.addEventListener('keyup', (e) => {
        e.cancelBubble = true
        if (input.value.trim()) {
          startButton.classList.remove('hide')

          startButton.addEventListener('click', () => {
            callback(input.value.slice(0, 1))
            startButton.classList.add('hide')
          })
        }
        else {
          startButton.classList.add('hide')
        }
      })
    })
  }

  getOrderSettings() {
    return new Promise((resolve) => {
      const yesText = document.querySelector('#select-first-yes')
      const noText = document.querySelector('#select-first-no')

      const onSelection = (e) => {
        resolve(e.target.innerText)
      }

      yesText.addEventListener('click', onSelection)
      yesText.addEventListener('mouseenter', this.changeCursorToPointer)
      yesText.addEventListener('mouseleave', this.changeCursorToDefault)

      noText.addEventListener('click', onSelection)
      noText.addEventListener('mouseenter', this.changeCursorToPointer)
      noText.addEventListener('mouseleave', this.changeCursorToDefault)
    })
  }
}
