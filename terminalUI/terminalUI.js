module.exports = class {
  constructor(input, output) {
    this.input = input || process.stdin
    this.output = output || process.stdout.write.bind(process.stdout)
    this.log = console.log
  }

  setup() {
  }

  getOrderSettings(callback) {
    this.promptUser('Would you like to go first? [Y/N] :')
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
    this.promptUser('Please pick a marker:')
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
