const TerminalUI = require('./terminalUI')
const inputValidations = require('./inputValidations')
const ticTacToe = require('../src/runner')

const orderValidations = inputValidations['ORDER_VALIDATIONS']
const gameplayValidations = inputValidations['GAMEPLAY_VALIDATIONS']

const cellCount = 9

ticTacToe(new TerminalUI({ orderValidations, gameplayValidations }), cellCount)
