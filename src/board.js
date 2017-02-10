const { transpose } = require('./util')
const BoardParser = require('./boardParser')

module.exports = class Board {
  constructor(boardState) {
    this.state = [...boardState]
  }

  transpose() {
    const transposedBoard = transpose(this.state)
    return new this.constructor(transposedBoard)
  }

  get openSpaces() {
    return this.indicesOf(' ')
  }

  validForks(myMarker, opponentsMarker) {
    const forks = this.allForks(opponentsMarker)

    return forks.filter(fork => {
      const winningPosition = BoardParser.indexOfWinningPosition(fork.state, myMarker)
      return !fork.openSpaces.includes(winningPosition)
    })
  }

  allForks(opponentsMarker) {
    return this.openSpaces.map(position => {
      const boardCopy = [...this.state]
      boardCopy[position] = opponentsMarker
      return new this.constructor(boardCopy)
    })
  }

  indicesOf(marker) {
    return this.state.reduce((result, m, index) => {
      if (marker === m) return [...result, index]
      return result
    }, [])
  }

  addMarker(marker, position) {
    if (!this.openSpaces.includes(position)) {
      return false
    }

    const copy = [...this.state]
    copy[position] = marker
    this.state = copy

    return true
  }
}
