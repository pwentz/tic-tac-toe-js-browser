class ComputerPlayer {
  constructor({ self, opponent }) {
    this.self = self
    this.opponent = opponent
    this.newBoardLayout = []
  }

  openSpaces(board) {
    return this.getSpaces(board, '')
  }

  didWinDiagonally(board, selectedMarker) {
    const mySpaces = this.getSpaces(board, selectedMarker)

    return (mySpaces.includes(0) && mySpaces.includes(4) && mySpaces.includes(8)) ||
      (mySpaces.includes(2) && mySpaces.includes(4) && mySpaces.includes(6))
  }

  didWinHorizontally(board, selectedMarker) {
    const takenIndices = this.getSpaces(board, selectedMarker)
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

  getSpaces(board, selectedMarker) {
    return board.reduce((result, marker, index) => {
      if (marker === selectedMarker) return [...result, index]
      return result
    }, [])
  }
}

// pass this into constructor for unit testability
module.exports = ComputerPlayer
