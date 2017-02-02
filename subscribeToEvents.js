const subscribeToEvents = () => {
  const submitButton = document.querySelector('#play-turn')

  submitButton.addEventListener('click', (e) => {
    const textField = document.querySelector('input')
    const tableBody = document.querySelector('tbody')
    const totalSpaces = [...tableBody.children].reduce((result, node) => {
      return [...result, ...node.children]
    }, []).map(n => n.innerText)

    console.log(totalSpaces)

    e.preventDefault()

    textField.value = ''
  })
}

subscribeToEvents()
