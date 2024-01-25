class Vector2d {
  public x: number;
  public y: number;

  static readonly UNIT_X = new Vector2d(1, 0); // 单位向量x
  static readonly UNIT_Y = new Vector2d(0, 1); // 单位向量y
  static readonly ZERO = new Vector2d(0, 0); // 零向量

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  add(v: Vector2d) : Vector2d{
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  static addVector(v1: Vector2d, v2: Vector2d) {
    return new Vector2d(v1.x + v2.x, v1.y + v2.y);
  }

  sub(v: Vector2d) : Vector2d {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  static subVector(v1: Vector2d, v2: Vector2d) : Vector2d {
    return new Vector2d(v1.x - v2.x, v1.y - v2.y);
  }

  addScalar(scalar: number) : Vector2d {
    this.x += scalar;
    this.y += scalar;
    return this;
  }

  static addScalarVector(v: Vector2d, scalar: number) : Vector2d {
    return new Vector2d(v.x + scalar, v.y + scalar);
  }

  subScalar(scalar: number) : Vector2d {
    this.x -= scalar;
    this.y -= scalar;
    return this;
  }

  static subScalarVector(v: Vector2d, scalar: number) : Vector2d {
    return new Vector2d(v.x - scalar, v.y - scalar);
  }

  multiplyByComponent(v: Vector2d): Vector2d {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }

  static multiplyByComponentVector(v1: Vector2d, v2: Vector2d): Vector2d {
    return new Vector2d(v1.x * v2.x, v1.y * v2.y);
  }

  multiplyByScalar(scalar: number) : Vector2d {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  static multiplyByScalarVector(v: Vector2d, scalar: number): Vector2d {
    return new Vector2d(v.x * scalar, v.y * scalar);
  }

  divide(v: Vector2d): Vector2d {
    if (v.x === 0 || v.y === 0) {
      throw new Error("Cannot divide by zero");
    }

    this.x /= v.x;
    this.y /= v.y;
    return this;
  }

  static divideVector(v1: Vector2d, v2: Vector2d): Vector2d {
    if (v2.x === 0 || v2.y === 0) {
      throw new Error("Cannot divide by zero");
    }
    return new Vector2d(v1.x / v2.x, v1.y / v2.y);
  }

  divideByScalar(scalar: number) : Vector2d {
    if (scalar === 0) {
      throw new Error("Cannot divide by scalar 0");
    }
    this.x /= scalar;
    this.y /= scalar;
    return this;
  }

  static divideByScalarVector(v: Vector2d, scalar: number): Vector2d {
    if (scalar === 0) {
      throw new Error("Cannot divide by scalar 0");
    }
    return new Vector2d(v.x / scalar, v.y / scalar);
  }

  cross(v: Vector2d) : number {
    return this.x * v.y - this.y * v.x;
  }

  dot(v: Vector2d) : number {
    return this.x * v.x + this.y * v.y;
  }

  length() : number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() : Vector2d {
    const length = this.length();
    this.x /= length;
    this.y /= length;
    return this;
  }

  static isZeroVector(v: Vector2d): boolean {
    return v.x == 0 && v.y === 0;
  }
}