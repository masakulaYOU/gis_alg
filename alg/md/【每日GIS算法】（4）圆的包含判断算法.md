本节主要介绍以下几种算法：
- 点是否在圆内
- 判断线段、折线、矩形、多边形是否在圆内
- 判断圆是否在圆内

## 判断点是否在圆内

很简单的，如果点距离圆心的距离小于等于半径，那么点就在圆内。

在这之前，我们需要给`Vector2d`定义一个距离的函数。

```typescript
// Vector2d.ts
distanceTo(v: Vector2d) : number {
  return Math.sqrt(Math.pow(v.x - this.x, 2) + Math.pow(v.y - this.y, 2));
}
```

然后就可以计算点到圆心的距离了
```typescript
// Circle.ts
containsPoint(v: Vector2d) {
  const distance = v.distanceTo(this._center);
  return distance <= this._radius;
}
```

其实这里的小于等于还是小于取决于自己，如果你觉得小于更符合你的逻辑，那么你可以把`distance <= this._radius`改为`distance < this._radius`。或者再定义一个类似`containsPointStrict`之类的方法，严格判断点是否在圆内。

## 判断线段、折线、矩形、多边形是否在圆内

判断线段、折线、矩形、多边形是否在圆内，其实和判断点是否在圆内差不多，只是需要遍历所有点，然后判断每个点是否在圆内。

但是由于我们定义的矩形并没有定义点，只是定义了边距离原点的距离，我们给`Rectangle2d`添加几个`get`方法，可以直接创建其角点。

```typescript
// Rectangle2d.ts
class Rectangle2d {
  
  private _leftTop: Vector2d;
  private _rightBottom: Vector2d;
  private _leftBottom: Vector2d;
  private _rightTop: Vector2d;

  private _left: number;
  private _right: number;
  private _top: number;
  private _bottom: number;

  constructor(left: number, right: number, top: number, bottom: number) {
    this._left = left < right ? left : right;
    this._right = right > left ? right : left;
    this._top = top > bottom ? top : bottom;
    this._bottom = bottom < top ? bottom : top;

    this._leftTop = new Vector2d(this._left, this._top);
    this._leftBottom = new Vector2d(this._left, this._bottom);
    this._rightTop = new Vector2d(this._right, this._top);
    this._rightBottom = new Vector2d(this._right, this._bottom);
  }

  get left() {
    return this._left;
  }

  get right() {
    return this._right;
  }

  get top() {
    return this._top;
  }

  get bottom() {
    return this._bottom;
  }

  get leftTop(): Vector2d {
    return this._leftTop;
  }

  get leftBottom(): Vector2d {
    return this._leftBottom;
  }

  get rightTop(): Vector2d {
    return this._rightTop;
  }

  get rightBottom(): Vector2d {
    return this._rightBottom;
  }
}
```


```typescript
// 包含某个点
containsPoint(v: Vector2d) {
  const distance = v.distanceTo(this._center);

  return distance <= this._radius;
}

containsLineSegment(l: LineSegment2d) {
  return this.containsPoint(l.start) && this.containsPoint(l.end);
}

containsLineSegments(l: LineSegments2d) {
  const points = l.points;
  for (let i = 0; i < points.length; i++) {
    if (!this.containsPoint(points[i])) { return false; }
  }

  return true;
} 

containsRectangle(r: Rectangle2d) {
  return this.containsPoint(r.leftBottom) && this.containsPoint(r.leftTop)
    && this.containsPoint(r.rightBottom) && this.containsPoint(r.rightTop);
}

containsPolygon(p: Polygon2d) {
  const points = p.positions;
  for (let i = 0; i < points.length; i++) {
    if (!this.containsPoint(points[i])) return false;
  }

  return true;
}
```

## 判断圆是否在圆内
设两圆为$O_1,O_2$，半径分别为$r_1,r_2$，要判断$O_2$是否在$O_1$中，首先我们比较$r_1,r_2$，如果$r_2>r_1$，那么$O_2$一定不在$O_1$中。如果两圆心的距离大于$r_1-r_2$，则$O_2$不在$O_1$中。否则，$O_2$在$O_1$中。

```typescript
containsCircle(c: Circle) {
  const r2 = c.getRadius();
  if (r2 > this._radius) return false;

  const radiusDiff = this._radius - r2;
  const centerDiff = this._center.distanceTo(c.getCenter());

  if (centerDiff > radiusDiff) return false;
  return true;
}
```



