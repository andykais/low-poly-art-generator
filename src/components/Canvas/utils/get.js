import Point from './point'

export function getFillStyle(rgbObj) {
  return `rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`
}

export function getRandomPoint(point, radius) {
  const maxX = Math.floor(point.x + radius)
  const minX = 0 //Math.ceil(point.x - radius)
  const newX = Math.floor(Math.random() * (maxX - minX)) + minX

  const maxY = Math.floor(point.x + radius)
  const minY = 0 //Math.ceil(point.x - radius)
  const newY = Math.floor(Math.random() * (maxY - minY)) + minY
  
  return new Point(newX, newY)
}

export function getAverageRGB(canvas, context, image) {
  var blockSize = 5, // only visit every 5 pixels
    defaultRGB = { r:0,g:0,b:0 }, // for non-supporting envs
    data, width, height,
    i = -4,
    length,
    rgb = { r:0,g:0,b:0 },
    count = 0

  if (!context) {
    return defaultRGB
  }

  height = canvas.height = image.naturalHeight || image.offsetHeight || image.height
  width = canvas.width = image.naturalWidth || image.offsetWidth || image.width

  context.drawImage(image, 0, 0)

  try {
    data = context.getImageData(0, 0, width, height)
  } catch(e) {
      /* security error, img on diff domain */
    return defaultRGB
  }

  length = data.data.length

  while ( (i += blockSize * 4) < length ) {
    ++count
    rgb.r += data.data[i]
    rgb.g += data.data[i+1]
    rgb.b += data.data[i+2]
  }

  // ~~ used to floor values
  rgb.r = ~~(rgb.r/count)
  rgb.g = ~~(rgb.g/count)
  rgb.b = ~~(rgb.b/count)

  return rgb

}
