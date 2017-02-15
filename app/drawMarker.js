module.exports = {
  O: (context, cellX, cellY) => {
    const radius = 20
    const circum = Math.PI * 2
    const startAngle = Math.PI / -2
    const endPercentage = 100
    const centerX = cellX + 50
    const centerY = cellY + 50

    const draw = (currentPercentage, currentAngle) => {
      context.beginPath()
      context.arc(centerX, centerY, radius, startAngle, currentAngle)
      context.stroke()
      const nextPercentage = currentPercentage + 5
      if (nextPercentage < endPercentage + 1) {
        requestAnimationFrame(() => {
          draw(nextPercentage,
               ((circum * nextPercentage) / 100) + startAngle)
        })
      }
    }

    draw(0)
  },

  X: (context, cellX, cellY) => {
    const startingLeftX = cellX + 35
    const startingY = cellY + 30
    const endingY = cellY + 80

    const drawRightStrike = (startingX, startingY) => {
      const newX = startingX - 1.25
      const newY = startingY + 2
      context.fillRect(newX, newY, 5, 5)

      if ((newY + 5) <= (endingY)) {
        requestAnimationFrame(() => {
          drawRightStrike(newX, newY)
        })
      }
    }

    const drawLeftStrike = (x,y) => {
      const newX = x + 1.25
      const newY = y + 2

      context.fillRect(newX, newY, 5, 5)

      if ((newY + 5) <= (endingY)) {
        requestAnimationFrame(() => {
          drawLeftStrike(newX, newY)
        })
      }
      else {
        const startingRightX = (cellX + 100) - 35

        drawRightStrike(startingRightX, startingY)
      }

    }

    drawLeftStrike(startingLeftX, startingY)
  }
}
