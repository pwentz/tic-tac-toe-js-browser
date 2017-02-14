class Outcome {
  static didWinDiagonally(board, selectedMarker) {
    const mySpaces = board.indicesOf(selectedMarker)

    if (mySpaces.includes(0) && mySpaces.includes(4) && mySpaces.includes(8)) {
      return [0, 4, 8]
    }

    if (mySpaces.includes(2) && mySpaces.includes(4) && mySpaces.includes(6)) {
      return [2, 4, 6]
    }

    return false
  }

  static didWinHorizontally(board, selectedMarker) {
    for (let i = 0 ; i < board.state.length ; i++) {
      if (i % 3 === 0) {
        const nextThree = board.state.slice(i, i + 3)
        const rowMarkers = nextThree.filter(m => m === selectedMarker)

        if (rowMarkers.length === 3) {
          return [i, i+1, i+2]
        }
      }
    }

    return false
  }

  static didWinVertically(board, selectedMarker) {
    for (let i = 0 ; i < board.state.length ; i++) {
      const isTopOfColumn = i < 3

      if (isTopOfColumn) {
        const column = [board.state[i], board.state[i + 3], board.state[i + 6]]
        const columnMarkers = column.filter(m => m === selectedMarker)

        if (columnMarkers.length === 3) {
          return [i, i+3, i+6]
        }
      }
    }

    return false
  }

  static didWin(board, selectedMarker) {
    return this.didWinDiagonally(board, selectedMarker) ||
            this.didWinHorizontally(board, selectedMarker) ||
             this.didWinVertically(board, selectedMarker)
  }

  static isGameOver(board, marker) {
    return this.didWin(board, marker) || !board.openSpaces.length
  }
}

module.exports = Outcome
