import { Circle } from "./Circle";
import { IShape } from "./IShape";
import { Rectangle } from "./Rectangle";

// src/ShapeService.ts
export async function fetchShapeData(): Promise<IShape[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          new Circle(7),
          new Rectangle(10, 5)
        ]);
      }, 1000);
    });
  }