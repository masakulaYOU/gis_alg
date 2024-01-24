class Rectangle3d extends Polygon3d {
  private _leftUp: Vector3d;
  private _rightUp: Vector3d;
  private _leftBottom: Vector3d;
  private _rightBottom: Vector3d;

  constructor(leftUp: Vector3d, rightUp: Vector3d, leftBottom: Vector3d, rightBottom: Vector3d) {
    super([leftUp, rightUp, rightBottom, leftBottom]);
    this._leftUp = leftUp;
    this._rightUp = rightUp;
    this._leftBottom = leftBottom;
    this._rightBottom = rightBottom;
  }

  public get leftUp(): Vector3d { return this._leftUp; }
  public get rightUp(): Vector3d { return this._rightUp; }
  public get leftBottom(): Vector3d { return this._leftBottom; }
  public get rightBottom(): Vector3d { return this._rightBottom; }
}