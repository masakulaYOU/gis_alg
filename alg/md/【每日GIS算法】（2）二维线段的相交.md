二维线段的相交，我们提供两种算法。

## 算法一

这种算法主要分为两步
- 快速排斥试验
- 跨立试验

### 快速排斥试验
快速排斥试验是指，假设以线段$P_1P_2$为对角线的矩形为$R$，以线段$Q_1Q_2$为对角线的矩形为$T$，如果$R$和$T$不相交，那么线段$P_1P_2$和$Q_1Q_2$不相交。

而判断两个矩形是否相交也很简单，如果其中一个矩形的X或者Y轴的最大值小于另一个矩形X或者Y轴的最小值，那么这两个矩形不相交。同理，如果一个矩形X轴或者Y轴的最小值大于另一个矩形的X或者Y轴的最大值，那么这两个矩形也不相交。

```typescript
if (
    Math.max(this.start.x, this.end.x) < Math.min(s.start.x, s.end.x) ||
    Math.min(this.start.x, this.end.x) > Math.max(s.start.x, s.end.x) ||
    Math.max(this.start.y, this.end.y) < Math.min(s.start.y, s.end.y) ||
    Math.min(this.start.y, this.end.y) > Math.max(s.start.y, s.end.y)
  )
    return false;
```

### 跨立试验
如果两线段相交，则两线段必然跨立对方。若$P_1P_2$跨立$Q_1Q_2$,则矢量$P_1-Q_1$和$P_2-Q_1$位于矢量$Q_2-Q_1$的两侧，即$(P_1-Q_1)\times(Q_2-Q_1)\times(P_2-Q_1)\times(Q_2-Q_1)<0$，也可以写为$(P_1-Q_1)\times(Q_2-Q_1)\times(Q_2-Q_1)\times(P_2-Q_1)>0$。

若$(P_1-Q_1)\times(Q_2-Q_1)=0$，说明$P_1-Q_1$和$Q_2-Q_1$共线。因为我们已经通过了快速排斥试验，所以$P_1$点一定在$Q_1Q_2$上。

同理，如果$Q_1Q_2$跨立$P_1P_2$，也有$(Q_1-P_1)\times(P_2-P_1)\times(P_2-P_1)\times(Q_2-P_1)\ge0$。

```typescript
// 判断两线段是否相交
hasIntersection(s: LineSegment2d) : boolean {
  // 1. 快速排斥实验，如果两个线段组成的矩形没有交点，则不会相交
  // 即其中一个的x的最大值小于另一个的最小值，或者其最小值大于另一个的最大值，y也是如此判断
  if (
    Math.max(this.start.x, this.end.x) < Math.min(s.start.x, s.end.x) ||
    Math.min(this.start.x, this.end.x) > Math.max(s.start.x, s.end.x) ||
    Math.max(this.start.y, this.end.y) < Math.min(s.start.y, s.end.y) ||
    Math.min(this.start.y, this.end.y) > Math.max(s.start.y, s.end.y)
  )
    return false;

  // 2. 跨立实验，如果线段相交，则线段必然有一个顶点在另一个线段内部
  // 假设this为p，s为q
  let _p1 = Vector2d.subVector(s.start, this.start);      // p1-q1
  let _p2 = Vector2d.subVector(s.start, this.end);           // p2-q1
  let _p3 = Vector2d.subVector(s.start, s.end);        // q2-q1

  if (_p1.cross(_p3) * _p3.cross(_p2) < 0) return false;

  // 跨立试验2
  _p1 = Vector2d.subVector(this.start, s.start);      // q1-p1
  _p2 = Vector2d.subVector(this.start, s.end);           // q2-p1
  _p3 = Vector2d.subVector(this.start, this.end);        // p2-p1

  if (_p1.cross(_p3) * _p3.cross(_p2) < 0) return false;

  return true;

}
```

## 算法二

