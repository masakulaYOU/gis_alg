class LineSegments2d extends LineSegments<Vector2d, LineSegment2d> {
  constructor(points: Vector2d[] = []) {
    super(points);
  }

  _buildSegments(): void {
    for (let i = 0; i < this.points.length - 1; i++) {
      const start = this._points[i];
      const end = this._points[i + 1];
      this._segments.push(new LineSegment2d(start, end));
    }
  }
}