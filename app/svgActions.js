const { cellToCoords, coordsToCell } = require('../src/util')

module.exports = (document) => {
  const getCellNumber = (e) => {
    const currentCellX = Math.floor(e.offsetX / 100) * 100
    const currentCellY = Math.floor(e.offsetY / 100) * 100
    return coordsToCell(currentCellX, currentCellY)
  }

  const drawMarker = (marker, selection) => {
    const { x, y } = cellToCoords(selection)

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')

    // text.setAttribute('x', x + 30)
    // text.setAttribute('y', y + 75)
    text.classList.add('marker')
//     text.addEventListener('animationend', () => {
      text.setAttribute('x', x + 40)
      text.setAttribute('y', y + 60)
//     })

    const content = document.createTextNode(marker)
    text.appendChild(content)
    document.querySelector('#board').appendChild(text)
  }

  const onClick = (callback) => {
    document.querySelector('#board').addEventListener('click', callback)
  }

  const drawBoard = () => {
    document.querySelector('#board').classList.remove('hide')
  }

  const unsubscribe = (callback) => {
    document.querySelector('#board').removeEventListener('click', callback)
  }

  return {
    getCellNumber,
    drawMarker,
    onClick,
    drawBoard,
    unsubscribe
  }
}
