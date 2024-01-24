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
}