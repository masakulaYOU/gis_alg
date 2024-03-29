class LineSegment2d extends LineSegment<Vector2d> {
  constructor(start: Vector2d, end: Vector2d) {
    super(start, end);
  }

  // 判断某点是否再线段上
  containsPoint(point: Vector2d): boolean {
    // (Q-P1)×(P2-P1)=0,且Q在p1 p2为对角顶点的矩形内
    const _p1 = Vector2d.subVector(point, this.start);
    const _p2 = Vector2d.subVector(this.end, this.start);
    const _p = _p1.cross(_p2);

    if (_p !== 0) return false;

    if (Math.min(this.start.x, this.end.x) <= point.x &&
        point.x <= Math.max(this.start.x, this.end.x) &&
        Math.min(this.start.y, this.end.y) <= point.y &&
        point.y <= Math.max(this.start.y, this.end.y)
      )
      return true;

    return false;
  }

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
    // 即，p1p2线段与q1q2组成的矩形有交点，且q1q2线段与p1p2组成的矩形有交点
    // p1p2跨立q1q2，即矢量(p1-q1)和(p2-q1)位于矢量q2-q1的两侧
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
}