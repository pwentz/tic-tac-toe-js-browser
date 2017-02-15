module.exports = {
  cellToCoords(cellNumber) {
    switch(cellNumber) {
      case 0:
        return { x: 0, y: 0 }
      case 1:
        return { x: 100, y: 0 }
      case 2:
        return { x: 200, y: 0 }
      case 3:
        return { x: 0, y: 100 }
      case 4:
        return { x: 100, y: 100 }
      case 5:
        return { x: 200, y: 100 }
      case 6:
        return { x: 0, y: 200 }
      case 7:
        return { x: 100, y: 200 }
      case 8:
        return { x: 200, y: 200 }
    }
  },

  coordsToCell(x, y) {
    switch(true) {
      case (x < 100):
        switch(true) {
          case (y < 100):
            return 0
          case (y < 200):
            return 3
          default:
            return 6
        }
      case (x < 200):
        switch(true) {
          case (y < 100):
            return 1
          case (y < 200):
            return 4
          default:
            return 7
        }
      default:
        switch(true) {
          case (y < 100):
            return 2
          case (y < 200):
            return 5
          default:
            return 8
        }
    }
  }
}
