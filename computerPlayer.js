class ComputerPlayer {
  constructor({ self, opponent }) {
    this.self = self
    this.opponent = opponent
    this.newBoardLayout = []
  }

  openSpaces(board) {
    return board.reduce((result, marker, index) => {
      if (!marker) return [...result, index]
      return result
    }, [])
  }

  calculateMinimaxScore(board) {
    // const openings = this.openSpaces(board)
    // if (openings.length) {
    //   board[openings[0]] = this.self
    //   this.newBoardLayout = board
    // }
  }

  didWinDiagonally(board, selectedMarker) {
    const mySpaces = board.reduce((result, marker, index) => {
      if (marker === selectedMarker) return [...result, index]
      return result
    }, [])

    return (mySpaces.includes(0) && mySpaces.includes(4) && mySpaces.includes(8)) ||
      (mySpaces.includes(2) && mySpaces.includes(4) && mySpaces.includes(6))
  }
}

module.exports = ComputerPlayer
