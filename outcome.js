class Outcome {
  static openSpaces(board) {
    return this.getIndex(board, '')
  }

  static didWinDiagonally(board, selectedMarker) {
    const mySpaces = this.getIndex(board, selectedMarker)

    return (mySpaces.includes(0) && mySpaces.includes(4) && mySpaces.includes(8)) ||
      (mySpaces.includes(2) && mySpaces.includes(4) && mySpaces.includes(6))
  }

  static didWinHorizontally(board, selectedMarker) {
    const takenIndices = this.getIndex(board, selectedMarker)
    let didWin;

    for (let i = 0 ; i < takenIndices.length ; i++) {
      const currentIndex = takenIndices[i]
      const nextIndex = takenIndices[i + 1]
      const lastIndex = takenIndices[i + 2]
      if ((currentIndex + 1 === nextIndex) && (nextIndex + 1 === lastIndex)) {
        didWin = true
      }
    }

    return didWin || false
  }

  static getIndex(board, selectedMarker) {
    return board.reduce((result, marker, index) => {
      if (marker === selectedMarker) return [...result, index]
      return result
    }, [])
  }

  static didWinVertically(board, selectedMarker) {
    const takenIndices = this.getIndex(board, selectedMarker)
    let didWin;

    for (let i = 0 ; i < takenIndices.length ; i++) {
      const currentIndex = takenIndices[i]
      const lowerIndices = takenIndices.filter(num => {
        return num + 3 === currentIndex || num + 6 === currentIndex
      })

      if (lowerIndices.length > 1) {
        didWin = true
      }
    }

    return didWin || false
  }
}

module.exports = Outcome
