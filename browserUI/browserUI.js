const { coordsToCell, cellToCoords } = require('../src/util')
const domSetup = require('./domSetup')
const createSvgActions = require('./svgActions')

module.exports = class {
  constructor(document) {
    this.svg = null
    this.doc = document

    this.changeCursorToPointer = this.changeCursorToPointer.bind(this)
    this.changeCursorToDefault = this.changeCursorToDefault.bind(this)
  }

  setup() {
    domSetup(this.doc)
    this.svg = createSvgActions(this.doc)
  }

  changeCursorToPointer() {
    this.doc.body.style.cursor = 'pointer'
  }

  changeCursorToDefault() {
    this.doc.body.style.cursor = 'default'
  }

  logWarning(message) {
    const existingWarning = this.doc.querySelector('.warning-text')

    if (!existingWarning) {
      const newWarning = this.doc.createElement('p')
      newWarning.innerText = message
      newWarning.classList.add('warning-text')
      this.doc.querySelector('body').appendChild(newWarning)

      newWarning.addEventListener('animationend', () => {
        newWarning.remove()
      })
    }
  }

  logMessage(message) {
    const newText = this.doc.createElement('p')
    newText.classList.add('result-text')
    newText.innerText = message
    this.doc.querySelector('body').appendChild(newText)
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

    this.doc.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        this.svg = null
        this.doc.querySelector('body').innerHTML = ''
        onReplay()
      }
    })
  }

  drawMarker(marker, selection, color) {
    const { x, y } = cellToCoords(selection)

    const text = this.doc.createElementNS('http://www.w3.org/2000/svg', 'text')

    text.classList.add('marker')
    text.setAttribute('x', x + 40)
    text.setAttribute('y', y + 60)
    text.setAttribute('fill', color)

    const content = this.doc.createTextNode(marker)
    text.appendChild(content)
    this.doc.querySelector('#board').appendChild(text)
  }

  renderBoard() {
    // hideOrderSelection
    this.doc.querySelector('#order-selection').classList.add('hide')
    this.doc.querySelector('#board').classList.remove('hide')
  }

  drawMarkerOne(marker, selection) {
    this.drawMarker(marker, selection, '#7CD3F9')
  }

  drawMarkerTwo(marker, selection) {
    this.drawMarker(marker, selection, 'white')
  }

  getMarkerSettings() {
    return new Promise((resolve) => {
      const input = this.doc.querySelector('#marker-selection input')
      const startButton = this.doc.querySelector('.start-button')

      const callback = (marker) => {
        // hideMarkerSettings
        this.doc.querySelector('#marker-selection').classList.add('hide')
        // showOrderSelection
        this.doc.querySelector('#order-selection').classList.remove('hide')
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
      const yesText = this.doc.querySelector('#select-first-yes')
      const noText = this.doc.querySelector('#select-first-no')

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
