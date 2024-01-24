class Box2d {
  private _min: Vector2d;
  private _max: Vector2d;

  constructor(min: Vector2d, max: Vector2d) {
    this._min = min;
    this._max = max;
  }

  public getMin(): Vector2d { return this._min; }
  public getMax(): Vector2d { return this._max; }
}