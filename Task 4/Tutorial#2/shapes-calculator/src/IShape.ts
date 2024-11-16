// src/IShape.ts
export interface IShape {
    type: string;
    getArea(): number;
    getPerimeter(): number;
  }