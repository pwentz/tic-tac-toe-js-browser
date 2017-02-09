const setup = require('./setup')

const logResults = (result) => {
  console.log(result)
}

(() => {
  const { game, userMarker, computerMarker, computer, board, isGameOver } = setup()

  const submitButton = document.querySelector('#play-turn')

  submitButton.addEventListener('click', (e) => {
    e.preventDefault()

    if(!isGameOver()) {
      const textField = document.querySelector('input')

      const nodes = [...document.querySelectorAll('td')]
      nodes[textField.value].innerText = userMarker
      board.addMarker(userMarker, textField.value)

      if (isGameOver()) {
        const getMessage = isGameOver()
        logResults(getMessage())
        return
      }

      const move = computer.getMove(game)

      board.addMarker(computerMarker, move)
      nodes[move].innerText = computerMarker

      if (isGameOver()) {
        const getMessage = isGameOver()
        logResults(getMessage())
        return
      }
    }

    document.querySelector('input').value = ''
  })
})()
