module.exports = class {
  constructor({ orderValidations, gameplayValidations }) {
    this.input = process.stdin
    this.output = process.stdout.write.bind(process.stdout)
    this.log = console.log

    this.orderValidations = orderValidations
    this.gameplayValidations = gameplayValidations

    this.board = []
  }

  setup(cellCount) {
    this.board = new Array(cellCount).fill(' ')
    this.log('============')
    this.log('TIC TAC TOE')
    this.log('============')
  }

  promptUserForTurn(resolve, reject) {
    this.promptUser('[0 - 8]: ')
    return this.getInput()
      .then((positionInput) => {
        if (this.isInputValid(this.gameplayValidations, positionInput)) {
          resolve(parseInt(positionInput.toString()))
        }
        else {
          reject('Invalid input.')
        }
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
          if (this.isInputValid(this.orderValidations, orderInput)) {
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
          const chosenMarker = markerInput.slice(0, 1)
          resolve(chosenMarker.trim() ? chosenMarker : 'O')
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

  isInputValid(validations, input) {
    return validations.every(v => v(input))
  }
}
