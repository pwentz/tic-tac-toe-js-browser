module.exports = class {
  constructor(gameLength) {
    this.gameLength = gameLength
  }

  get totalCells() {
    return this.gameLength * this.gameLength
  }

  get center() {
    return Math.floor(this.totalCells / 2)
  }

  get topLeftCorner() {
    return 0
  }

  get topRightCorner() {
    return this.gameLength - 1
  }

  get downwardDiagonals() {
    let indices = [0]
    for (let i = 1 ; i < this.totalCells ; i++) {
      if ((i % (this.gameLength + 1)) === 0) {
        indices.push(i)
      }
    }

    return indices
  }

  get upwardDiagonals() {
    let indices = []
    for (let i = this.totalCells - 2 ; i > 0 ; i--) {
      if ((i % (this.gameLength - 1)) === 0) {
        indices.push(i)
      }
    }

    return indices
  }

  column(index) {
    let indices = []
    for (let i = index ; i < this.totalCells ; i += this.gameLength) {
      indices.push(i)
    }

    return indices
  }

  row(index) {
    let indices = [index]
    for (let i = index + 1 ; i % this.gameLength !== 0 ; i++) {
      indices.push(i)
    }

    return indices
  }
}
