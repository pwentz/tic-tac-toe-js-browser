module.exports = {
  ORDER_VALIDATIONS: [
    (input) => {
      const formattedInput = input.toString().toLowerCase()
      const firstLetter = formattedInput.slice(0, 1)
      return ((firstLetter === 'y') || (firstLetter === 'n'))
    }
  ],

  GAMEPLAY_VALIDATIONS: [
    (input) => !isNaN(input),
    (input) => parseInt(input) <= 8,
    (input) => parseInt(input) >= 0
  ]
}
