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

  get body() {
    return this.get('body')
  }

  get(selector) {
    return this.doc.querySelector(selector)
  }

  show(node) {
    node.classList.remove('hide')
  }

  setup(cellCount) {
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
    const existingWarning = this.get('.warning-text')

    if (!existingWarning) {
      const newWarning = this.doc.createElement('p')
      newWarning.innerText = message
      newWarning.classList.add('warning-text')
      this.body.appendChild(newWarning)

      newWarning.addEventListener('animationend', () => {
        newWarning.remove()
      })
    }
  }

  logMessage(message) {
    const newText = this.doc.createElement('p')
    newText.classList.add('result-text')
    newText.innerText = message
    this.body.appendChild(newText)
  }

  promptUserForTurn(resolve) {
    const onClick = (e) => {
      this.svg.unsubscribe(onClick)
      resolve(this.svg.getCellNumber(e))
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
        this.body.innerHTML = ''
        onReplay()
      }
    })
  }

  drawMarker(marker, selection, color) {
    const { x, y } = cellToCoords(selection)

    const markerNode = this.doc.createElementNS('http://www.w3.org/2000/svg', 'text')

    markerNode.classList.add('marker')
    markerNode.setAttribute('x', x + 40)
    markerNode.setAttribute('y', y + 60)
    markerNode.setAttribute('fill', color)

    const content = this.doc.createTextNode(marker)
    markerNode.appendChild(content)
    this.svg.append(markerNode)
  }

  renderBoard() {
    this.get('#order-selection').remove()
    this.svg.show()
  }

  drawMarkerOne(marker, selection) {
    this.drawMarker(marker, selection, '#7CD3F9')
  }

  drawMarkerTwo(marker, selection) {
    this.drawMarker(marker, selection, 'white')
  }

  getMarkerSettings() {
    return new Promise((resolve) => {
      const input = this.get('#marker-selection input')
      const startButton = this.get('.start-button')

      const onSelectMarker = (marker) => {
        const markerSelection = this.get('#marker-selection')
        markerSelection && markerSelection.remove()
        this.show(this.get('#order-selection'))

        resolve(marker ? marker : 'O')
      }

      startButton.addEventListener('click', () => {
        onSelectMarker(input.value.slice(0, 1))
        startButton.remove()
      })

      input.addEventListener('keyup', (e) => {
        e.cancelBubble = true

        if (input.value.trim()) {
          this.show(startButton)
        }
        else {
          startButton.classList.add('hide')
        }
      })
    })
  }

  getOrderSettings() {
    return new Promise((resolve) => {
      const yesText = this.get('#select-first-yes')
      const noText = this.get('#select-first-no')

      const onSelectOrder = (e) => {
        this.changeCursorToDefault()
        resolve(e.target.innerText)
      }

      yesText.addEventListener('click', onSelectOrder)
      yesText.addEventListener('mouseenter', this.changeCursorToPointer)
      yesText.addEventListener('mouseleave', this.changeCursorToDefault)

      noText.addEventListener('click', onSelectOrder)
      noText.addEventListener('mouseenter', this.changeCursorToPointer)
      noText.addEventListener('mouseleave', this.changeCursorToDefault)
    })
  }
}
