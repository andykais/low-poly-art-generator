export async function drawTriangle(context, points) {
  context.lineWidth = 1
  context.strokeStyle = '#000'
  context.beginPath()
  context.moveTo(...points[0].xy)
  for (let i = 1; i < points.length; ++i) {
    if (i > 2) {
      console.log('even')
      context.lineTo(...points[i].xy)
      context.lineTo(...points[i - 2].xy)
      context.moveTo(...points[i].xy)
    } else {
      console.log('odd')
      context.lineTo(...points[i].xy)
    }
    context.stroke()
    await timeout(2000)
  }

  //context.closePath()
  context.stroke()
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
