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

    text.classList.add('marker')
    text.setAttribute('x', x + 40)
    text.setAttribute('y', y + 60)

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

  const drawResults = (positions) => {
    const strikeCoords = positions.map(pos => {
      const { x, y } = cellToCoords(pos)
      return { x: x + 50, y: y + 50 }
    })

    const d = `M${strikeCoords[0].x},${strikeCoords[0].y} L${strikeCoords[2].x},${strikeCoords[2].y}`

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    const board = document.querySelector('#board')
    path.setAttribute('d', d)
    path.setAttribute('stroke', 'black')
    path.setAttribute('fill', 'black')
    board.appendChild(path)
    path.classList.add('winning-path')
    board.classList.add('flatten-board')
    board.addEventListener('animationend', (e) => {
      if (e.target.matches('svg')) {
        board.setAttribute('height', '0px')
      }
    })
  }

  return {
    drawResults,
    getCellNumber,
    drawMarker,
    onClick,
    drawBoard,
    unsubscribe
  }
}
