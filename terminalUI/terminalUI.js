module.exports = class {
  constructor(input, output) {
    this.input = input || process.stdin
    this.output = output || process.stdout.write.bind(process.stdout)
    this.log = console.log

    this.board = new Array(9).fill(' ')
  }

  promptUserForTurn() {
    this.promptUser('[0 - 8]: ')
    return this.getInput()
      .then((positionInput) => {
        return new Promise(resolve => {
          resolve(parseInt(positionInput.toString()))
        })
      })
  }

  onGameOver(outcome) {
    this.log(outcome.message)
  }

  drawMarker(marker, selection) {
    this.board[selection] = marker
    this.renderBoard()
  }

  drawMarkerOne(marker, selection) {
    this.drawMarker(marker, selection)
  }

  drawMarkerTwo(marker, selection) {
    this.drawMarker(marker, selection)
  }

  renderBoard() {
    this.log('------------')
    this.log(
      ' ' + this.board[0] + ' |' + ' ' + this.board[1] + ' |' + ' ' + this.board[2]
      + '\n===+===+===\n' +
        ' ' + this.board[3] + ' |' + ' ' + this.board[4] + ' |' + ' ' + this.board[5]
      + '\n===+===+===\n' +
        ' ' + this.board[6] + ' |' + ' ' + this.board[7] + ' |' + ' ' + this.board[8]
    )
    this.log('------------')
  }

  getOrderSettings(callback) {
    this.promptUser('Would you like to go first? [Y/N] : ')
    return this.getInput()
      .then((orderInput) => {
        return new Promise(resolve => {
          resolve(orderInput.toLowerCase())
        })
      })
      .catch((error) => {
        this.log(error)
      })
  }

  getMarkerSettings(callback) {
    this.promptUser('Please pick a marker: ')
    return this.getInput()
     .catch((error) => {
        this.log(error)
     })
  }

  promptUser(message) {
    return this.output(message)
  }

  getInput() {
    return new Promise((resolve, reject) => {
      let userInput = ''

      this.input.resume()

      this.input.once('data', chunk => {
        userInput += chunk

        if (userInput.includes('\n')) {
          userInput = userInput.replace('\n', '')

          this.input.pause()

          resolve(userInput.slice(0, 1))
        }
      })
    })
  }
}