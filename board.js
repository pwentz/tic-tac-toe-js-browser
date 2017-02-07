const BoardParser = require('./boardParser')
const { transpose } = require('./util')

module.exports = class Board {
  constructor(boardState) {
    this.state = boardState
  }

  transpose() {
    const transposedBoard = transpose(this.state)
    return new this.constructor(transposedBoard)
  }

  get openSpaces() {
    return this.indicesOf(' ')
  }

  forks(marker) {
    return this.openSpaces.map(position => {
      const boardCopy = [...this.state]
      boardCopy[position] = marker
      return new this.constructor(boardCopy)
    })
  }

  indicesOf(marker) {
    return this.state.reduce((result, m, index) => {
      if (marker === m) return [...result, index]
      return result
    }, [])
  }
}
