// src/Rectangle.ts
import { IShape } from './IShape';
import { ShapeType } from './ShapeType';

export class Rectangle implements IShape {
  type: string = ShapeType.Rectangle;
  constructor(public width: number, public height: number) {}

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}