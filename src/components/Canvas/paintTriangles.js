import {
  //getAverageRGB,
  //getFillStyle,
  getRandomPoint
} from './utils/get'
import { drawTriangle } from './utils/draw'
import Point from './utils/point'

export default function(canvas, context, image) {
  //const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
  //const averageColor = getFillStyle(getAverageRGB(canvas, context, image))

  const triangle = []
  const initPoint = new Point(0, -1)
  const radius = 100
  const numPoints = 3

  triangle.push(initPoint)
  for (let i = 1; i < numPoints; ++i) {
    triangle.push(getRandomPoint(triangle[i - 1], radius))
  }
  console.log(triangle)
  drawTriangle(context, triangle)

  //console.log(imageData)
  //console.log(averageColor)
}
