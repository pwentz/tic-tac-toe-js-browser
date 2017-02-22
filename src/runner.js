module.exports = (ui) => {
  const userSettings = { }
  ui.getMarkerSettings(marker => {
    console.log('marker: ', marker)

    ui.getOrderSettings(isUserGoingFirst => {
      if (isUserGoingFirst.slice(0, 1) === 'y') {
        console.log('USER IS GOING FIRST')
      }
    })
  })

}
