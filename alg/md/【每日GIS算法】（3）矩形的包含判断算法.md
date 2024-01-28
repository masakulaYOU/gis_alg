本节主要介绍以下几种判断包含关系的算法：
- 判断矩形是否包含点
- 判断线段、折线、多边形是否在矩形中
- 判断矩形是否在矩形中
- 判断圆是否在矩形中


## 判断矩形是否包含点

只需要判断该点的横坐标和纵坐标是否夹在矩形的左右边和上下边之间。

为了保证构造的矩形的合法性，我们修改一下矩形的构造函数，对于左右边、上下边，要保证左边小于右边，上边大于下边，如果输入不合法，我们将对应的位置对调。

```typescript
// Rectangle2d.ts
constructor(left: number, right: number, top: number, bottom: number) {
  this._left = left < right ? left : right;
  this._right = right > left ? right : left;
  this._top = top > bottom ? top : bottom;
  this._bottom = bottom < top ? bottom : top;
}
```

那么判断点是否在矩形内就很容易了。

```typescript
containsPoint(point: Vector2d) {
  if (point.x >= this.left && point.x <= this.right &&
      point.y >= this.bottom && point.y <= this.top) {
    return true;
  }

  return false;
}
```

## 判断线段、折线、多边形是否在矩形中
因为矩形是个凸集，所以只要判断所有的端点都在矩形中就可以了.

```typescript
// 包含线段
containsLineSegment(l: LineSegment2d) {
  if (this.containsPoint(l.start) && this.containsPoint(l.end)) {
    return true;
  }
  return false;
}

// 包含折线
containsLineSegments(l: LineSegments2d) {
  const points = l.points;
  for (let i = 0; i < points.length; i++){
    if (!this.containsPoint(points[i])) {
      return false;
    }
  }

  return true;
}

// 包含矩形
containsPolygon(p: Polygon2d) {
  const points = p.positions;
  for (let i = 0; i < points.length; i++){
    if (!this.containsPoint(points[i])) {
      return false;
    }
  }

  return true;
}
```

## 判断矩形是否在矩形中

只需要比较左右边界和上下边界即可。
```typescript
 // 是否包含矩形
containsRectangle(r: Rectangle2d) {
  if (r.left >= this.left && r.right <= this.right &&
    r.bottom >= this.bottom && r.top <= this.top ){
      return true;
    }
  return false;
}
```

## 判断圆是否在矩形中

圆在矩形中的充要条件是：圆心在矩形中且圆的半径小于等于圆心到矩形四边的距离的最小值。

```typescript
// 是否包含圆
containsCircle(c: Circle) {
  const center = c.getCenter();
  const radius = c.getRadius();
  // 判断圆心是否在矩形内
  if (center.x >= this.right && center.x <= this.left &&
    center.y >= this.top && center.y <= this.bottom ) {
      return false;
    }
  
  // 圆心到四条边的最小值
  const minDistance = Math.min(center.x - this.left, this.right - center.x, center.y - this.bottom, this.top - center.y);

  if (minDistance < radius) return false;

  return true;
}
```

