const ScoreCalculator = require('./scoreCalculator')
const BoardParser = require('./boardParser')

module.exports = class Computer {
  constructor(marker) {
    this.marker = marker
  }

  parser(board) {
    return new BoardParser(board)
  }

  get opposingSymbols() {
    return {
      'O': 'X',
      'X': 'O'
    }
  }

  getMove(board) {
    const oppositeSymbol = this.opposingSymbols[this.marker]
    const parser = this.parser(board.state)
    const gameSavingPosition = parser.indexOfWinningPosition(oppositeSymbol)
    const gameWinningPosition = parser.indexOfWinningPosition(this.marker)

    if (gameWinningPosition !== -1) {
      return gameWinningPosition
    }

    if (gameSavingPosition !== -1) {
      return gameSavingPosition
    }

    const scoresByOpenPosition = board.openSpaces.map(opening => {
      const calculator = new ScoreCalculator(board.state, opening, this.marker)
      calculator.calculateScore()
      return { position: opening, score: calculator.score }
    })

    const scoresAboveZero = scoresByOpenPosition.filter(i => i.score > 0)
    const scoresBelowZero = scoresByOpenPosition.filter(i => i.score < 0)

    const areOverAThirdOfScoresAboveZero = scoresAboveZero.length > Math.floor(scoresByOpenPosition.length / 3)
    const areExactlyAThirdOfScoresBelowZero = scoresBelowZero.length === Math.floor(scoresByOpenPosition.length / 3)

    // if (areExactlyAThirdOfScoresBelowZero) {
    //   const byHighestScore = (a, b) => b.score > a.score

    //   const bestOptions = scoresByOpenPosition.sort(byHighestScore)
    //   // console.log(bestOptions)
    //   return bestOptions[0].position
    // }

    if (areOverAThirdOfScoresAboveZero && !areExactlyAThirdOfScoresBelowZero) {
      const byClosestToZero = (a, b) => Math.abs(a.score) > Math.abs(b.score)

      const bestOptions = scoresByOpenPosition.sort(byClosestToZero)
      // console.log(bestOptions)
      return bestOptions[0].position
    }


    const byHighestScore = (a, b) => b.score > a.score

    const bestOptions = scoresByOpenPosition.sort(byHighestScore)
    // console.log(bestOptions)
    return bestOptions[0].position
  }
}
