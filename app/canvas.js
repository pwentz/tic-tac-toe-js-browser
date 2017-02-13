const { cellToCoords, coordsToCell } = require('../src/util')
const drawMarker = require('./drawMarker')
const drawBoard = require('./drawBoard')

module.exports = class {
  constructor(canvas, context) {
    this.canvas = canvas
    this.context = context

    this.setContextStyles()
  }

  setContextStyles() {
    this.context.lineWidth = 5
    this.context.fillStyle = 'white'
    this.context.strokeStyle = 'white'
  }

  drawBoard() {
    this.show()
    drawBoard(this.canvas, this.context)
  }

  getCellNumber(e) {
    const currentCellX = Math.floor(e.offsetX / 100) * 100
    const currentCellY = Math.floor(e.offsetY / 100) * 100
    return coordsToCell(currentCellX, currentCellY)
  }

  drawMarker(marker, cellNumber) {
    const currentCellCoords = cellToCoords(cellNumber)
    const { x, y } = currentCellCoords

    drawMarker[marker](this.context, x, y)
  }

  onClick(callback) {
    this.canvas.addEventListener('click', callback)
  }

  unsubscribe(eventCallback) {
    this.canvas.removeEventListener('click', eventCallback)
  }

  show() {
    this.canvas.classList.remove('hide')
  }
}
