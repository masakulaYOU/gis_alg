class Box3d {
  private _min: Vector3d;
  private _max: Vector3d;

  constructor(min: Vector3d, max: Vector3d) {
    this._min = min;
    this._max = max;
  }

  public getMin(): Vector3d { return this._min;}
  public getMax(): Vector3d { return this._max;}
}