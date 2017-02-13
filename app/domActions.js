const Canvas = require('./svgBoard')

module.exports = (document) => {
  const changeMouseToPointer = () => document.body.style.cursor = 'pointer'
  const changeMouseBack = () => document.body.style.cursor = 'default'

  const logResults = (result) => {
    const newText = document.createElement('p')
    newText.classList.add('result-text')
    newText.innerText = result
    document.querySelector('body').appendChild(newText)
  }

  const getCanvas = () => {
    return new Canvas(document)
  }

  const hideMarkerSettings = () => {
    document.querySelector('#marker-selection').classList.add('hide')
  }

  const orderSelection = document.querySelector('#order-selection')

  const showOrderSelection = () => {
    orderSelection.classList.remove('hide')
  }

  const hideOrderSelection = () => {
    orderSelection.classList.add('hide')
  }

  const subscribeToOrderSelection = (selection, callback) => {
    const options = {
      yes: document.querySelector('#select-first-yes'),
      no: document.querySelector('#select-first-no')
    }

    options[selection].addEventListener('click', callback)
    options[selection].addEventListener('mouseenter', changeMouseToPointer)
    options[selection].addEventListener('mouseleave', changeMouseBack)
  }

  const hideTitle = () => {
    document.querySelector('#title').classList.add('hide')
  }

  const subscribeToMarkerSelection = (callback) => {
    document.querySelector('#marker-selection button').addEventListener('click', callback)
  }

  return {
    logResults,
    hideTitle,
    getCanvas,
    showOrderSelection,
    hideOrderSelection,
    hideMarkerSettings,
    subscribeToOrderSelection,
    subscribeToMarkerSelection
  }
}
