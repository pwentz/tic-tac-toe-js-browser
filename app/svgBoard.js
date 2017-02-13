const { cellToCoords, coordsToCell } = require('../src/util')

module.exports = class {
  constructor(document) {
    this.document = document
  }

  getCellNumber(e) {
    const currentCellX = Math.floor(e.offsetX / 100) * 100
    const currentCellY = Math.floor(e.offsetY / 100) * 100
    return coordsToCell(currentCellX, currentCellY)
  }

  drawMarker(marker, selection) {
    const { x, y } = cellToCoords(selection)

    const text = this.document.createElementNS('http://www.w3.org/2000/svg', 'text')

    text.setAttribute('x', x + 40)
    text.setAttribute('y', y + 60)
    text.setAttribute('font-size', '40')
    text.setAttribute('font-family', 'Pangolin')
    const content = this.document.createTextNode(marker)
    text.appendChild(content)
    this.document.querySelector('#board').appendChild(text)
  }

  onClick(callback) {
    this.document.querySelector('#board').addEventListener('click', callback)
  }

  drawBoard() {
    this.document.querySelector('#board').classList.remove('hide')
  }

  unsubscribe(callback) {
    this.document.querySelector('#board').removeEventListener('click', callback)
  }
}
