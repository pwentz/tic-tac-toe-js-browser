const createSvgActions = require('./svgActions')

module.exports = (document) => {
  const changeMouseToPointer = () => document.body.style.cursor = 'pointer'
  const changeMouseBack = () => document.body.style.cursor = 'default'

  const logResults = (result) => {
    const { positions, message } = result
    const newText = document.createElement('p')
    newText.classList.add('result-text')
    newText.innerText = message
    document.querySelector('body').appendChild(newText)

    // CODE GOES HERE
    const svg = getSvgActions(document)
    svg.drawResults(positions)
  }

  const getSvgActions = () => {
    return createSvgActions(document)
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

  const subscribeToMarkerSelection = (callback) => {
    const input = document.querySelector('#marker-selection input')
    input.addEventListener('keyup', callback)
    input.focus()
  }

  return {
    logResults,
    getSvgActions,
    showOrderSelection,
    hideOrderSelection,
    hideMarkerSettings,
    subscribeToOrderSelection,
    subscribeToMarkerSelection
  }
}
