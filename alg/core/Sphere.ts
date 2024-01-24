class Sphere {
  private _center: Vector3d;
  private _radius: number;

  constructor(center: Vector3d, radius: number) {
    this._center = center;
    this._radius = radius;
  }

  public getCenter(): Vector3d{
    return this._center;
  }

  public getRadius(): number {
    return this._radius;
  }
}