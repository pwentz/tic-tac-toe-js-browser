module.exports = (ui) => {
  const userSettings = { }
  ui.getMarkerSettings()
    .then(marker => {
      // set userMarker
      // set computerMarker
      console.log('MARKER:', marker)

      return ui.getOrderSettings()
    })
    .then(isUserGoingFirst => {
      // draw board
      if (isUserGoingFirst.slice(0, 1) === 'y') {
        // play computer turn
        // check for game over
        // draw board
        // open up for input
        // check for game over
        // draw board
        // repeat
        console.log('USER IS GOING FIRST')
      }
      else {
        // open up for input
        // check for game over
        // draw board
        // play computer turn
        // check for game over
        // draw board
        // repeat
      }
    })
    .catch(error => {
      console.log(error)
    })
}
