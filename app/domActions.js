const createSvgActions = require('./svgActions')

module.exports = (document) => {
  const changeMouseToPointer = () => document.body.style.cursor = 'pointer'
  const changeMouseBack = () => document.body.style.cursor = 'default'

  const renderOutcome = (message) => {
    const newText = document.createElement('p')
    newText.classList.add('result-text')
    newText.innerText = message
    document.querySelector('body').appendChild(newText)
  }

  const onGameOver = (result) => {
    const { positions, message } = result
    const svg = getSvgActions()

    renderOutcome(message)
    positions ? svg.applyResults(positions)
              : svg.startEndGameAnimations()
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
    const startButton = document.querySelector('.start-button')

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

    input.focus()
  }

  const subscribeToReplay = (callback) => {
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        callback()
      }
    })
  }

  return {
    onGameOver,
    getSvgActions,
    showOrderSelection,
    hideOrderSelection,
    hideMarkerSettings,
    subscribeToOrderSelection,
    subscribeToMarkerSelection,
    subscribeToReplay
  }
}
