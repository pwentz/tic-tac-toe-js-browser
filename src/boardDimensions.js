module.exports = class {
  constructor(gameLength) {
    this.gameLength = gameLength
    this.totalCells = gameLength * gameLength
    this.center = Math.floor(this.totalCells / 2)
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
