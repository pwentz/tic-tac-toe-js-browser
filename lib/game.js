module.exports = class Game {
  constructor({ board, markerOne, markerTwo }) {
    this.board = board
    this.markerOne = markerOne
    this.markerTwo = markerTwo
  }

  get opponents() {
    return {
      [this.markerOne] : this.markerTwo,
      [this.markerTwo] : this.markerOne
    }
  }
}
