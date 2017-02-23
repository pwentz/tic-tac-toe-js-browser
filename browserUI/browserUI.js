const createDomActions = require('./domActions')
const { showOrderSelection, hideOrderSelection,
        hideMarkerSettings, subscribeToOrderSelection,
        subscribeToMarkerSelection } = createDomActions(document)

module.exports = class {
  setup() {
  }

  getMarkerSettings() {
    return new Promise((resolve) => {
      subscribeToMarkerSelection((marker) => {
        hideMarkerSettings()
        // document.querySelector('#marker-selection').classList.add('hide')
        showOrderSelection()
        //document.querySelector('#order-selection').classList.remove('hide')
        resolve(marker)
      })
    })
  }

  getOrderSettings() {
    return new Promise((resolve) => {
      const onSelection = (e) => {
        resolve(e.target.innerText)
      }

      subscribeToOrderSelection('yes', onSelection)
      subscribeToOrderSelection('no', onSelection)
    })
  }
}
