class LineSegments<V, S> {
  protected _points: V[];
  protected _segments: S[];
  constructor(points: V[]) {
    this._points = points;
    this._buildSegments();
  }

  _buildSegments(): void {}


  get points() : V[] {
    return this._points;
  }

  get segments() : S[] {
    return this._segments;
  }
}