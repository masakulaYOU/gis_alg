二维向量的基础运算主要有以下几种
- 矢量的加法
- 矢量的减法
- 矢量的乘法
- 矢量的除法
- 矢量的模
- 矢量的点乘
- 矢量的叉乘
- 矢量的归一化

针对不同的场景，我们为二维矢量类提供对应的实例方法，但是由于这些实例方法会修改对象内部的数值，因此还提供对应的静态方法，在不改变原来的向量的情况下，返回一个新的向量。

## 1. 矢量的加法
二维向量的加法可以定义为将两个二维向量对应位置的数值相加。

```typescript
add(v: Vector2d) : Vector2d{
  this.x += v.x;
  this.y += v.y;
  return this;
}

static addVector(v1: Vector2d, v2: Vector2d) {
  return new Vector2d(v1.x + v2.x, v1.y + v2.y);
}
```

为了方便使用，我们提供一个矢量与标量的加法函数，矢量的每一项都加上对应的标量值。

```typescript
addScalar(scalar: number) : Vector2d {
  this.x += scalar;
  this.y += scalar;
  return this;
}

static addScalarVector(v: Vector2d, scalar: number) : Vector2d {
  return new Vector2d(v.x + scalar, v.y + scalar);
}
```

## 2. 矢量的减法
同理，矢量的减法就是对应的位置相减，同样我们提供了一个与标量的减法方法。

``` typescript
sub(v: Vector2d) : Vector2d {
  this.x -= v.x;
  this.y -= v.y;
  return this;
}

static subVector(v1: Vector2d, v2: Vector2d) : Vector2d {
  return new Vector2d(v1.x - v2.x, v1.y - v2.y);
}

subScalar(scalar: number) : Vector2d {
  this.x -= scalar;
  this.y -= scalar;
  return this;
}

static subScalarVector(v: Vector2d, scalar: number) : Vector2d {
  return new Vector2d(v.x - scalar, v.y - scalar);
}
```

## 3. 矢量的乘法
矢量的乘法有很多种，我们针对以后可能需要，提供三种不同的乘法方法，第一种是将两个矢量对应位置的数值相乘，第二种是矢量点乘，第三种是将两个矢量叉乘，

### 矢量对应位置的数值相乘

此处我们同样支持了与标量的乘法，将矢量的每一项都乘以对应的标量值。

```typescript
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
```
### 矢量点乘
矢量点乘的意义可以看作为其中一个矢量向另一个矢量上进行投影，投影矢量的长度与另一个矢量的长度的成绩，其结果是一个标量，其公式为：
$$
\vec{v} \cdot \vec{w} = |\vec{v}| \times |\vec{w}| \times \cos\theta
$$
数学结果表达式可以表示为
$$
\vec{v} \cdot \vec{w} = v_x \times w_x + v_y \times w_y
$$

```typescript
dot(v: Vector2d) : number {
  return this.x * v.x + this.y * v.y;
}
```

### 矢量叉乘
在三维空间中，两个三维矢量的叉乘的结果也是一个三维矢量，这个三维矢量的方向垂直于相乘的两个三维矢量组成的平面，矢量的长度为$|\vec{v}|\times |\vec{w}|\times\sin\theta$，其中，$\theta$为两个矢量组成的平面的夹角，夹角的方向符合右手螺旋定则。

但是在二维空间中，两个二维矢量的叉乘的结果是一个标量，其公式为：
$$
\vec{v} \times \vec{w} = v_x \times w_y - v_y \times w_x
$$

实际上二维空间的矢量的叉乘可以看作三维空间中，$z$轴都为0，起点为原点的两个三维向量的叉乘结果，其结果一定是一个垂直于$XY$平面，起点为原点，即位于$Z$轴上的一个三维向量。由于其$XY$值都是0，我们就不考虑了，只考虑$Z$轴的值即可。

```typescript
cross(v: Vector2d) : number {
  return this.x * v.y - this.y * v.x;
}
```

针对二维矢量叉乘的结果的符号，我们可以用来判断一条折线段的拐向。假设一条折线段有三个点p0p1p2，我们定义X轴正方向为右向，X轴负方向为左向，那么点从p1点拐到p2点，这个折线段是向左拐了还是向右拐了。我们可以通过$(p_2-p_0)\times(p_1-p_0)$的结果来判断，如果结果为正，则向左拐，如果结果为负，则向右拐，如果为0，则说明三点共线。这个结论在后续一些操作中会用到。

## 矢量除法
矢量的除法我们同样定义了对应位置的除法操作，以及对一个标量的除法操作，同时定义了对应的静态方法，用于返回新向量。

在这里注意的是，由于0不能做除数，所以我们需要判断一下，如果除数为0，则抛出一个错误。当然，如果你不想抛出错误，而是想返回一个默认值，那么你可以自己实现一个默认值的返回方法。

```typescript
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
```

## 矢量的模

矢量的模就是矢量的长度。一个二维矢量的模可以用勾股定理来计算，即$|v|=\sqrt{v_x^2+v_y^2}$
```typescript
length() : number {
  return Math.sqrt(this.x * this.x + this.y * this.y);
}
```

## 矢量的标准化

矢量的标准化就是将矢量的模变为1，即将矢量的方向不变，而将模变为1。一个二维矢量的标准化可以用矢量的模除以原模来计算，即$v'=v/|v|$
```typescript
normalize() : Vector2d {
  const length = this.length();
  this.x /= length;
  this.y /= length;
  return this;
}
```

## 其他操作

除以上操作之外，我们定义几个内部静态变量，分别是$XY$轴上的单位向量以及零向量。

```typescript
static readonly UNIT_X = new Vector2d(1, 0); // 单位向量x
static readonly UNIT_Y = new Vector2d(0, 1); // 单位向量y
static readonly ZERO = new Vector2d(0, 0); // 零向量
```

还有更多的向量操作，如旋转等，等以后我们需要的时候再创建。
