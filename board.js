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

  get parser() {
    return new BoardParser(this.state)
  }

  forks(marker) {
    // return the fork that will lead to opponent victory
    // const winningPosition = this.parser.indexOfWinningPosition(marker)
    // const isOpponentInPositionToWin = this.state.includes(winningPosition)
    // if (isOpponentInPositionToWin) {
    //   const boardCopy = [...this.state]
    //   boardCopy[winningPosition] = marker
    //   return new this.constructor(boardCopy)
    // }
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

  addMarker(marker, position) {
    this.state[position] = marker
  }
}
