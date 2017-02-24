const BrowserUI = require('./browserUI')
const ticTacToe = require('../src/runner')

ticTacToe(new BrowserUI(document))
