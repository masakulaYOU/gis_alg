本系列文章主要使用typescript手动实现GIS算法，其目的并不在于能够在正式生产中直接使用，而是可以通过对这些算法的实现，了解一些GIS方法的具体原理。本系列文章一定程度上与计算机图形学关系密切，也可以更好地了解图形学中相关知识点。

本文作为本系列文章的第一篇，首先实现一些基础的几何实体的构造方法，作为后续的算法的基础。之后实现的算法也都是在这些几何实体的基础之上进行的。主要创建的几种实例类型为：

- 矢量（2d，3d）
- 线段（2d，3d）
- 折线（2d，3d）
- 多边形（2d，3d）
- 矩形（2d，3d）
- 包围盒（2d，3d）
- 圆
- 球

# 矢量

矢量的实现是最简单的，确定空间的纬度，然后根据纬度确定内部有多少项即可。

注意，矢量能够表示的东西很多，可以表示一个方向，也可以表示一个点，所以，点类型的实体不需要再重复创建。

```typescript
// Vector2d.ts
class Vector2d {
    
  public x: number;
  public y: number;
  
    constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }
}
```

```typescript
// Vector3d.ts
class Vector3d{

  public x: number;
  public y: number;
  public z: number;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
```

# 线段

线段的创建只需要两个点，在二维和三维空间中都是如此。

由于二三维线段的创建并无区别，我们使用一个基类`LineSegment`，然后将2d和3d线段类都继承这个基类即可。

```typescript
// LineSegment.ts
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
```

```typescript
// LineSegment2d.ts
class LineSegment2d extends LineSegment<Vector2d> {
  constructor(start: Vector2d, end: Vector2d) {
    super(start, end);
  }
}
```

```typescript
// LineSegment3d.ts
class LineSegment3d extends LineSegment<Vector3d> {
  constructor(start: Vector3d = new Vector3d(), end: Vector3d = new Vector3d()) {
    super(start, end);
  }
}
```

# 折线

折线是由一系列的点相互连接而成的，因此，其构造函数我们只需要将所有的点按顺序传入即可。除此之外，我们希望还能够存储折线内所有的线段，因此，我们增加一个抽象接口`_buildSegments`用于创建每一条线段，由其二维和三维子类分别实现这个接口，只需要按顺序取出每一个点，然后通过连续的两个点创建一个对应的线段类型即可。

```typescript
// LineSegments.ts
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
```

```typescript
// LineSegments2d.ts
class LineSegments2d extends LineSegments<Vector2d, LineSegment2d> {
  constructor(points: Vector2d[] = []) {
    super(points);
  }

  _buildSegments(): void {
    for (let i = 0; i < this.points.length - 1; i++) {
      const start = this._points[i];
      const end = this._points[i + 1];
      this._segments.push(new LineSegment2d(start, end));
    }
  }
}
```

```typescript
class LineSegments3d extends LineSegments<Vector3d, LineSegment3d> {

  constructor(points: Vector3d[] = []) { 
    super(points);
  }

  _buildSegments(): void {
    for (let i = 0; i < this._points.length - 1; i++) {
      const start = this._points[i];
      const end = this._points[i + 1];
      this._segments.push(new LineSegment3d(start, end));
    }
  }
}
```

# 多边形

多边形是由一系列点组成的一个闭合的区域。此处我们先不做太多的考虑，不考虑包含孔洞和分离的多边形，只考虑一个内部完全闭合、不自交的多边形，我们只需要将所有的点存储起来即可，具体的、更复杂的结构我们以后再实现。

```typescript
// Polygon.ts
class Polygon<T> {

  private _positions: T[];
  
  constructor(positions: T[]) {
    this._positions = positions;
  }

  public get positions(): T[] {
    return this._positions;
  }
}
```

```typescript
// Poligon2d.ts
class Polygon2d extends Polygon<Vector2d> {
  constructor(positions: Vector2d[]) {
    super(positions);
  }
}
```

```typescript
// Polygon3d.ts
class Polygon3d extends Polygon<Vector3d> {
  constructor(positions: Vector3d[]) {
    super(positions);
  }
}
```

# 矩形

矩形可以看作一个特殊的多边形，这个多边形只有四个点。我们按照左上、右上、右下、左下的顺序将这四个点存储起来即可。二三维矩形除了顶点类型不一样，其他都是一样的。

```typescript
// Rectangle2d.ts
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
```

```typescript
// Rectangle3d.ts
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
```

# 圆和球

圆和球都是由一个圆心（球心）和一个半径组成的。

``` typescript
// Circle.ts
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
```

```typescript
// Sphere.ts
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
```

# 包围盒

包围盒表示一个几何体在不同的维度的最大和最小值范围，我们只需要保存每一个维度的最值即可。还有一种包围盒，即紧致包围盒，这种包围盒我们暂时不做考虑。

```typescript
// Box2d.ts
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
```

```typescript
// Box3d.ts
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
```

------

本文我们只考虑基础几何类型的创建，对于这些几何体基本操作，我们以后再进行。