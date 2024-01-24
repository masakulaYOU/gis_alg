class Rectangle2d extends Polygon2d {
  private _leftUp: Vector2d;
  private _rightUp: Vector2d;
  private _leftBottom: Vector2d;
  private _rightBottom: Vector2d;

  constructor(leftUp: Vector2d, rightUp: Vector2d, leftBottom: Vector2d, rightBottom: Vector2d) {
    super([leftUp, rightUp, rightBottom, leftBottom]);
    this._leftUp = leftUp;
    this._rightUp = rightUp;
    this._leftBottom = leftBottom;
    this._rightBottom = rightBottom;
  }

  public get leftUp(): Vector2d { return this._leftUp; }
  public get rightUp(): Vector2d { return this._rightUp; }
  public get leftBottom(): Vector2d { return this._leftBottom; }
  public get rightBottom(): Vector2d { return this._rightBottom; }
}