const BoardParser = require('./boardParser')

module.exports = class Board {
  constructor(boardState) {
    this.state = boardState
  }

  get parser() {
    return new BoardParser(this.state)
  }

  forks(marker) {
    const openings = this.parser.getIndex(' ')

    return openings.map(position => {
      const boardCopy = [...this.state]
      boardCopy[position] = marker
      return new this.constructor(boardCopy)
    })
  }
}
