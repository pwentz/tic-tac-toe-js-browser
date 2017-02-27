const { cellToCoords, coordsToCell } = require('../src/util')

module.exports = (document) => {
  const self = document.querySelector('#board')

  const getCellNumber = (e) => {
    const currentCellX = Math.floor(e.offsetX / 100) * 100
    const currentCellY = Math.floor(e.offsetY / 100) * 100
    return coordsToCell(currentCellX, currentCellY)
  }

  const onClick = (callback) => {
    self.addEventListener('click', callback)
  }

  const show = () => {
    self.classList.remove('hide')
  }

  const unsubscribe = (callback) => {
    self.removeEventListener('click', callback)
  }

  const applyResults = (positions) => {
    const strikeCoords = positions.map(pos => {
      const { x, y } = cellToCoords(pos)
      return { x: x + 50, y: y + 50 }
    })

    const d = `M${strikeCoords[0].x},${strikeCoords[0].y} L${strikeCoords[2].x},${strikeCoords[2].y}`

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')

    path.setAttribute('d', d)
    path.setAttribute('stroke', '#7CD3F9')
    path.setAttribute('fill', '#7CD3F9')

    path.classList.add('winning-path')

    self.appendChild(path)

    startEndGameAnimations()
  }

  const startEndGameAnimations = () => {
    const title = document.querySelector('.title h3')

    self.classList.add('flatten-board')

    title.classList.add('flatten-title')

    self.addEventListener('animationend', flattenBoard)
    title.addEventListener('animationend', expandReplayTitle)
  }

  const flattenBoard = (e) => {
    if (e.target.matches('svg')) {
      board.setAttribute('height', '0px')
    }
  }

  const expandReplayTitle = (e) => {
    const { parentElement } = e.target

    parentElement.innerHTML = ''
    const newTitle = document.createElement('h3')
    newTitle.innerHTML = "Press <span class='blue-text'>ENTER</span> to replay."
    newTitle.classList.add('expand-title')
    parentElement.appendChild(newTitle)
  }

  const append = (markerNode) => {
    self.appendChild(markerNode)
  }

  return {
    applyResults,
    getCellNumber,
    onClick,
    unsubscribe,
    startEndGameAnimations,
    append,
    show
  }
}
