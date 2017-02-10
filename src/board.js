const { transpose } = require('./util')

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

  getForks(marker, filterConstraint) {
    const forks = this.openSpaces.map(position => {
      const boardCopy = [...this.state]
      boardCopy[position] = marker
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
