class Circle {
  private _center: Vector2d;
  private _radius: number;
  
  constructor(center: Vector2d, radius: number) {
    this._center = center;
    this._radius = radius;
  }

  public getCenter(): Vector2d {
    return this._center;
  }

  public getRadius(): number { 
    return this._radius;
  }

  // 包含某个点
  containsPoint(v: Vector2d) {
    const distance = v.distanceTo(this._center);

    return distance <= this._radius;
  }

  containsLineSegment(l: LineSegment2d) {
    return this.containsPoint(l.start) && this.containsPoint(l.end);
  }

  containsLineSegments(l: LineSegments2d) {
    const points = l.points;
    for (let i = 0; i < points.length; i++) {
      if (!this.containsPoint(points[i])) { return false; }
    }

    return true;
  } 

  containsRectangle(r: Rectangle2d) {
    return this.containsPoint(r.leftBottom) && this.containsPoint(r.leftTop)
      && this.containsPoint(r.rightBottom) && this.containsPoint(r.rightTop);
  }

  containsPolygon(p: Polygon2d) {
    const points = p.positions;
    for (let i = 0; i < points.length; i++) {
      if (!this.containsPoint(points[i])) return false;
    }

    return true;
  }

  containsCircle(c: Circle) {
    const r2 = c.getRadius();
    if (r2 > this._radius) return false;

    const radiusDiff = this._radius - r2;
    const centerDiff = this._center.distanceTo(c.getCenter());

    if (centerDiff > radiusDiff) return false;
    return true;
  }
}