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

  get parser() {
    return BoardParser
  }

  validForks(myMarker, opponentsMarker) {
    const constraint = (fork) => {
      const winningPosition = this.parser.indexOfWinningPosition(fork.state, myMarker)
      return !fork.openSpaces.includes(winningPosition)
    }

    return this.allForks(opponentsMarker, constraint)
  }

  allForks(opponentsMarker, filterConstraint) {
    const forks = this.openSpaces.map(position => {
      const boardCopy = [...this.state]
      boardCopy[position] = opponentsMarker
      return new this.constructor(boardCopy)
    })

    if (filterConstraint) {
      return forks.filter(filterConstraint)
    }

    return forks
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
