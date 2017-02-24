module.exports = class {
  constructor({ orderValidations }) {
    this.input = process.stdin
    this.output = process.stdout.write.bind(process.stdout)
    this.log = console.log

    this.orderValidations = orderValidations

    this.board = new Array(9).fill(' ')
  }

  setup() {
  }

  promptUserForTurn(resolve) {
    this.promptUser('[0 - 8]: ')
    return this.getInput()
      .then((positionInput) => {
        resolve(parseInt(positionInput.toString()))
      })
  }

  logWarning(warning) {
    this.log(warning)
  }

  onGameOver(outcome, onReplay) {
    const { positions, message } = outcome
    this.log(message)
    this.log('--------------')

    this.promptUser('Enter [R/r] to replay: ')
    this.getInput()
      .then(input => {
        const formattedInput = input.toString().toLowerCase()
        if (formattedInput.slice(0,1) === 'r') {
          this.board = new Array(9).fill(' ')
          onReplay()
        }
      })
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

  getOrderSettings() {
    this.promptUser('Would you like to go first? [y/n]: ')
    return this.getInput()
      .then((orderInput) => {
        return new Promise((resolve, reject) => {
          if (this.orderValidations.every(v => v(orderInput))) {
            resolve(orderInput.toLowerCase())
          }
          else {
            reject()
          }
        })
      })
  }

  getMarkerSettings() {
    this.promptUser('Please pick a marker: ')
    return this.getInput()
      .then((markerInput) => {
        return new Promise(resolve => {
          resolve(markerInput.slice(0, 1))
        })
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

          resolve(userInput)
        }
      })
    })
  }
}
