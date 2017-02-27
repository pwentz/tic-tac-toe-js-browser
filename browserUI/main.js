const BrowserUI = require('./browserUI')
const ticTacToe = require('../src/runner')

const cellCount = 9

ticTacToe(new BrowserUI(document), cellCount)
