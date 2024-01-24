class LineSegment<T> {
  private _start: T;
  private _end: T;

  constructor(start: T, end: T) {
    this._start = start;
    this._end = end;
  }

  public get start(): T {
    return this._start;
  }

  public get end(): T {
    return this._end;
  }
}