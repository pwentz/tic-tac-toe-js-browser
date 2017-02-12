const setup = require('./setup')

const logResults = (result) => {
  const newText = document.createElement('p')
  newText.classList.add('result-text')
  newText.innerText = result
  document.querySelector('body').appendChild(newText)
}

(() => {
  const { game, computer, markerDict, board, isGameOver } = setup()

  const selectionX = document.querySelector('#X h1')
  const selectionO = document.querySelector('#O h1')

  const onMarkerSelection = (e) => {
    const chosenMarker = e.target.innerText
    const computerMarker = markerDict[chosenMarker]
    game.markerOne = chosenMarker
    game.markerTwo = computerMarker
    computer.marker = computerMarker

    selectionX.classList.add('hide')
    selectionO.classList.add('hide')
    document.querySelector('.instructional-text').classList.add('hide')
    document.querySelector('#board').classList.remove('hide')
  }

  selectionX.addEventListener('click', onMarkerSelection)
  selectionO.addEventListener('click', onMarkerSelection)

  document.addEventListener('click', (e) => {
    if (!e.target.matches('td')) return

    e.preventDefault()

    if (!isGameOver()) {
      const userSelection = parseInt(e.target.getAttribute('ref'))

      const isValidInput = board.addMarker(game.markerOne, userSelection)

      if (!isValidInput) {
        return
      }

      e.target.innerText = game.markerOne

      if (isGameOver()) {
        const getMessage = isGameOver()
        logResults(getMessage())
        return
      }

      const move = computer.getMove(game)
      const nodes = [...document.querySelectorAll('td')]
      nodes[move].innerText = game.markerTwo
      board.addMarker(game.markerTwo, move)

      if (isGameOver()) {
        const getMessage = isGameOver()
        logResults(getMessage())
        return
      }
    }
  })
})()
