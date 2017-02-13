const Canvas = require('./canvas')

module.exports = (document) => {
  const logResults = (result) => {
    const newText = document.createElement('p')
    newText.classList.add('result-text')
    newText.innerText = result
    document.querySelector('body').appendChild(newText)
  }

  const getCanvas = () => {
    const canvas = document.getElementById('game-board')
    const context = canvas.getContext('2d')

    return new Canvas(canvas, context)
  }

  const selectionX = document.querySelector('#X h1')
  const selectionO = document.querySelector('#O h1')

  const hideMarkerSettings = () => {
    selectionX.classList.add('hide')
    selectionO.classList.add('hide')
    document.querySelector('.instructional-text').classList.add('hide')
  }

  const subscribeToMarkerSelection = (callback) => {
    selectionX.addEventListener('click', callback)
    selectionO.addEventListener('click', callback)
  }

  const orderSelection = document.querySelector('#order-selection')

  const showOrderSelection = () => {
    orderSelection.classList.remove('hide')
  }

  const hideOrderSelection = () => {
    orderSelection.classList.add('hide')
  }

  const yesGoFirst = document.querySelector('#select-first-yes')
  const noGoFirst = document.querySelector('#select-first-no')

  const subscribeToOrderSelection = (callback, onDefer) => {
    yesGoFirst.addEventListener('click', callback)
    noGoFirst.addEventListener('click', callback)
    noGoFirst.addEventListener('click', onDefer)
  }

  return {
    logResults,
    getCanvas,
    showOrderSelection,
    hideOrderSelection,
    hideMarkerSettings,
    subscribeToOrderSelection,
    subscribeToMarkerSelection
  }
}
