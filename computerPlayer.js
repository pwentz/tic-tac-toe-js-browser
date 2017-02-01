class ComputerPlayer {
  openSpaces(board) {
    return board.filter(cell => !cell).length
  }
}
