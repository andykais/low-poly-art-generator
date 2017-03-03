class Point {
  constructor(x = 0, y = 0) {
    this.xy = [x, y]
  }
  get x() {
    return this.xy[0]
  }
  get y() {
    return this.xy[1]
  }
  set x(x) {
    this.xy[0] = x
  }
  set y(y) {
    this.xy[1] = y
  }
}
export default Point
