const setup = require('./setup')

const logResults = (result) => {
  console.log(result)
}

(() => {
  const { game, userMarker, computerMarker, computer, board, isGameOver } = setup()

  document.addEventListener('click', (e) => {
    if (!e.target.matches('td')) return

    e.preventDefault()

    if (!isGameOver()) {
      const userSelection = parseInt(e.target.getAttribute('ref'))
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
