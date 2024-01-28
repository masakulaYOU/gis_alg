class Rectangle2d {
  
  private _leftTop: Vector2d;
  private _rightBottom: Vector2d;
  private _leftBottom: Vector2d;
  private _rightTop: Vector2d;

  private _left: number;
  private _right: number;
  private _top: number;
  private _bottom: number;

  constructor(left: number, right: number, top: number, bottom: number) {
    this._left = left < right ? left : right;
    this._right = right > left ? right : left;
    this._top = top > bottom ? top : bottom;
    this._bottom = bottom < top ? bottom : top;

    this._leftTop = new Vector2d(this._left, this._top);
    this._leftBottom = new Vector2d(this._left, this._bottom);
    this._rightTop = new Vector2d(this._right, this._top);
    this._rightBottom = new Vector2d(this._right, this._bottom);
  }

  get left() {
    return this._left;
  }

  get right() {
    return this._right;
  }

  get top() {
    return this._top;
  }

  get bottom() {
    return this._bottom;
  }

  get leftTop(): Vector2d {
    return this._leftTop;
  }

  get leftBottom(): Vector2d {
    return this._leftBottom;
  }

  get rightTop(): Vector2d {
    return this._rightTop;
  }

  get rightBottom(): Vector2d {
    return this._rightBottom;
  }

  // 包含某点
  containsPoint(point: Vector2d) {
    if (point.x >= this.left && point.x <= this.right &&
        point.y >= this.bottom && point.y <= this.top) {
      return true;
    }

    return false;
  }

  // 包含线段
  containsLineSegment(l: LineSegment2d) {
    if (this.containsPoint(l.start) && this.containsPoint(l.end)) {
      return true;
    }
    return false;
  }

  // 包含折线
  containsLineSegments(l: LineSegments2d) {
    const points = l.points;
    for (let i = 0; i < points.length; i++){
      if (!this.containsPoint(points[i])) {
        return false;
      }
    }

    return true;
  }

  // 包含矩形
  containsPolygon(p: Polygon2d) {
    const points = p.positions;
    for (let i = 0; i < points.length; i++){
      if (!this.containsPoint(points[i])) {
        return false;
      }
    }

    return true;
  }

  // 是否包含矩形
  containsRectangle(r: Rectangle2d) {
    if (r.left >= this.left && r.right <= this.right &&
      r.bottom >= this.bottom && r.top <= this.top ){
        return true;
      }
    return false;
  }

  // 是否包含圆
  containsCircle(c: Circle) {
    const center = c.getCenter();
    const radius = c.getRadius();
    // 判断圆心是否在矩形内
    if (center.x >= this.right && center.x <= this.left &&
      center.y >= this.top && center.y <= this.bottom ) {
        return false;
      }
    
    // 圆心到四条边的最小值
    const minDistance = Math.min(center.x - this.left, this.right - center.x, center.y - this.bottom, this.top - center.y);

    if (minDistance < radius) return false;

    return true;
    
  }

}