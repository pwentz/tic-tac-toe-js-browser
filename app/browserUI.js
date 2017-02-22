const createDomActions = require('./domActions')
const { showOrderSelection, hideOrderSelection,
        hideMarkerSettings, subscribeToOrderSelection,
        subscribeToMarkerSelection } = createDomActions(document)

module.exports = class {
  getMarkerSettings(callback) {
    subscribeToMarkerSelection((marker) => {
      hideMarkerSettings()
      showOrderSelection()
      callback(marker)
    })
  }

  getOrderSettings(callback) {
    const onSelection = (e) => {
      callback(e.target.innerText)
    }

    subscribeToOrderSelection('yes', onSelection)
    subscribeToOrderSelection('no', onSelection)
  }
}
