module.exports = class {
  constructor(boardSize) {
    this.boardSize = boardSize
    this.count = boardSize * boardSize
    this.center = Math.floor(this.count / 2)
    this.downwardDiagonals = this.getDownwardDiagonals()
    this.upwardDiagonals = this.getUpwardDiagonals()
  }

  getDownwardDiagonals() {
    let indices = [0]
    for (let i = 1 ; i < this.count ; i++) {
      if ((i % (this.boardSize + 1)) === 0) {
        indices.push(i)
      }
    }

    return indices
  }

  getUpwardDiagonals() {
    let indices = []
    for (let i = this.count - 2 ; i > 0 ; i--) {
      if ((i % (this.boardSize - 1)) === 0) {
        indices.push(i)
      }
    }

    return indices
  }

  column(index) {
    let indices = []
    for (let i = index ; i < this.count ; i += this.boardSize) {
      indices.push(i)
    }

    return indices
  }

  row(index) {
    let indices = [index]
    for (let i = index + 1 ; i % this.boardSize !== 0 ; i++) {
      indices.push(i)
    }

    return indices
  }
}
