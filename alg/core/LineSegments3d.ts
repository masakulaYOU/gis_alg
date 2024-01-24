class LineSegments3d extends LineSegments<Vector3d, LineSegment3d> {

  constructor(points: Vector3d[] = []) { 
    super(points);
  }

  _buildSegments(): void {
    for (let i = 0; i < this._points.length - 1; i++) {
      const start = this._points[i];
      const end = this._points[i + 1];
      this._segments.push(new LineSegment3d(start, end));
    }
  }
}