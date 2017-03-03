import React from 'react'

//import darth from '../../assets/darth-vader.jpg'
import paintTriangles from './paintTriangles'

class Canvas extends React.Component {
  componentDidMount() {
    const canvas = this.refs.draw
    const context = canvas.getContext('2d')
    //const img = this.refs.image
    const imageObj = new Image()

    //imageObj.onload = function() {
      //canvas.width = imageObj.width
      //canvas.height = imageObj.height
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)
    //context.fill()
    //context.drawImage(imageObj, 0, 0)
    paintTriangles(canvas,context,imageObj)
    //}
    //imageObj.src = darth
    //imageObj.src = ''
  }
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate')
    return false
  }
  render() {
    return (
    <div>
      <canvas 
        ref="draw" 
        width={ 300 } 
        height={ 300 }
        style={
          { border: '1px red solid' }
        }
      />
    </div>
    )
  }
}

export default Canvas
