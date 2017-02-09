const setup = require('./setup')

const logResults = (result) => {
  const newText = document.createElement('p')
  newText.classList.add('result-text')
  newText.innerText = result
  document.querySelector('body').appendChild(newText)
}

(() => {
  const { game, userMarker, computerMarker, computer, board, isGameOver } = setup()

  document.addEventListener('click', (e) => {
    if (!e.target.matches('td')) return

    e.preventDefault()

    if (!isGameOver()) {
      const userSelection = parseInt(e.target.getAttribute('ref'))
      // this is game logic
      if (!board.openSpaces.includes(userSelection)) return
      //
      e.target.innerText = userMarker
      board.addMarker(userMarker, userSelection)

      if (isGameOver()) {
        const getMessage = isGameOver()
        logResults(getMessage())
        return
      }

      const move = computer.getMove(game)
      const nodes = [...document.querySelectorAll('td')]
      nodes[move].innerText = computerMarker
      board.addMarker(computerMarker, move)

      if (isGameOver()) {
        const getMessage = isGameOver()
        logResults(getMessage())
        return
      }
    }
  })
})()
