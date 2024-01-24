class Polygon<T> {

  private _positions: T[];
  
  constructor(positions: T[]) {
    this._positions = positions;
  }

  public get positions(): T[] {
    return this._positions;
  }
  
}