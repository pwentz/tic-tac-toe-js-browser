module.exports = (canvas, context) => {
  const speed = 15
  const draw = {
    ACROSS_X: (x, y) => {
      const width = speed
      const height = 5
      const newX = x + speed
      context.fillRect(newX, y, width, height)
      if ((newX + width) <= canvas.height) {
        return (stroke) => {
          requestAnimationFrame(() => stroke(newX, y))
        }
      }
    },
    DOWN_Y: (x, y) => {
      const width = 5
      const height = speed
      const newY = y + speed
      context.fillRect(x, newY, width, height)
      if ((newY + height) <= canvas.height) {
        return (stroke) => {
          requestAnimationFrame(() => stroke(x, newY))
        }
      }
    }
  }

  const verticalStroke = (x, y, stroke, nextStroke) => {
    const drawIfPossible = draw['DOWN_Y'](x, y)
    if (drawIfPossible) {
      drawIfPossible(stroke)
    }
    else {
      nextStroke()
    }
  }

  const horizontalStroke = (x, y, stroke, nextStroke) => {
    const drawIfPossible = draw['ACROSS_X'](x, y)
    if (drawIfPossible) {
      drawIfPossible(stroke)
    }
    else {
      nextStroke()
    }
  }

  const leftStroke = (x, y) => {
    verticalStroke(x, y, leftStroke, () => {
      requestAnimationFrame(() => {
        rightStroke(canvas.width - 100, 0)
      })
    })
  }

  const rightStroke = (x, y) => {
    verticalStroke(x, y, rightStroke, () => {
      requestAnimationFrame(() => topStroke(0, 100))
    })
  }

  const topStroke = (x, y) => {
    horizontalStroke(x, y, topStroke, () => {
      requestAnimationFrame(() => {
        bottomStroke(0, canvas.height - 100)
      })
    })
  }

  const bottomStroke = (x, y) => {
    horizontalStroke(x, y, bottomStroke, () => {})
  }

  requestAnimationFrame(() => leftStroke(100, 0))
}
