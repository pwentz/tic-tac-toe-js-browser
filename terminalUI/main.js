const terminalUI = require('./terminalUI')
const inputValidations = require('./inputValidations')
const play = require('../src/runner')

const orderValidations = inputValidations['ORDER_VALIDATIONS']

play(new terminalUI({ orderValidations }))
