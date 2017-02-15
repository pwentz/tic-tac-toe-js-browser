const { transpose } = require('./util')
const BoardDimensions = require('./boardDimensions')

module.exports = class Board {
  constructor(boardState) {
    this.state = [...boardState]
    this.dimensions = new BoardDimensions(Math.sqrt(this.state.length))
  }

  transpose() {
    const transposedBoard = transpose(this.state)
    return new this.constructor(transposedBoard)
  }

  get openSpaces() {
    return this.indicesOf(' ')
  }

  getForks(marker, constraint) {
    const forks = this.openSpaces.map(position => {
      const boardCopy = [...this.state]
      boardCopy[position] = marker
      return new this.constructor(boardCopy)
    })

    if (constraint) {
      return forks.filter(constraint)
    }

    return forks
  }

  indicesOf(marker) {
    return this.state.reduce((result, m, index) => {
      if (marker === m) return [...result, index]
      return result
    }, [])
  }

  addMarker(marker, position, onSuccess) {
    if (!this.isOpen(position)) return

    const copy = [...this.state]
    copy[position] = marker
    this.state = copy

    if (onSuccess) {
      onSuccess()
    }
  }

  isOpen(index) {
    return this.openSpaces.includes(index)
  }
}
