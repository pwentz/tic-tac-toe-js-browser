module.exports = (document) => {
  const body = document.querySelector('body')

  const createTitleContainerAndChildren = () => {
    const titleContainer = document.createElement('div')
    titleContainer.classList.add('title')
    titleContainer.classList.add('center')

    const title = document.createElement('h3')
    title.innerText = 'Tic Tac Toe'

    titleContainer.appendChild(title)

    return titleContainer
  }

  const createOrderContainerAndChildren = () => {
    const orderContainer = document.createElement('div')
    orderContainer.classList.add('hide')
    orderContainer.id = 'order-selection'

    const textContainer = document.createElement('div')
    textContainer.classList.add('instructional-text')
    textContainer.innerText = 'Play first?'
    orderContainer.appendChild(textContainer)

    const yesText = document.createElement('h2')
    yesText.classList.add('result-text')
    yesText.id = 'select-first-yes'
    yesText.innerText = 'Yes'
    orderContainer.appendChild(yesText)

    const noText = document.createElement('h2')
    noText.classList.add('result-text')
    noText.id = 'select-first-no'
    noText.innerText = 'No'
    orderContainer.appendChild(noText)

    return orderContainer
  }

  const createMarkerContainerAndChildren = () => {
    const markerContainer = document.createElement('div')
    markerContainer.id = 'marker-selection'

    const instructionalText = document.createElement('h6')
    instructionalText.classList.add('instructional-text')
    instructionalText.innerText = 'Select your marker:'
    markerContainer.appendChild(instructionalText)

    const inputContainer = document.createElement('div')
    inputContainer.classList.add('center')
    const input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('maxlength', '1')
    input.classList.add('invisible-input')
    inputContainer.appendChild(input)
    markerContainer.appendChild(inputContainer)

    const startButtonContainer = document.createElement('div')
    startButtonContainer.id = 'start-button-container'
    startButtonContainer.classList.add('center')
    const startButton = document.createElement('button')
    startButton.classList.add('start-button')
    startButton.classList.add('hide')
    startButton.innerText = 'Start'
    startButtonContainer.appendChild(startButton)
    markerContainer.appendChild(startButtonContainer)

    return markerContainer
  }

  const createBoardContainerAndChildren = () => {
    const boardContainer = document.createElement('div')
    boardContainer.classList.add('center')
    boardContainer.id = 'board-container'

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('height', '300')
    svg.setAttribute('width', '300')
    svg.classList.add('hide')
    svg.id = 'board'

    boardContainer.appendChild(svg)

    return boardContainer
  }

  const titleContainer = createTitleContainerAndChildren()
  const orderContainer = createOrderContainerAndChildren()
  const markerContainer = createMarkerContainerAndChildren()
  const boardContainer = createBoardContainerAndChildren()

  body.appendChild(titleContainer)
  body.appendChild(orderContainer)
  body.appendChild(markerContainer)
  body.appendChild(boardContainer)

  markerContainer.querySelector('input').focus()
}
