// src/index.ts
import { Circle } from './Circle';
import { Rectangle } from './Rectangle';
import { displayDetailedInfo } from './ShapeUtils';

import { fetchShapeData } from './ShapeService';

const circle = new Circle(5);
const rectangle = new Rectangle(4, 6);

displayDetailedInfo(circle);
console.log('-------------------');
displayDetailedInfo(rectangle);

async function main() {
    const shapes = await fetchShapeData();
    shapes.forEach((shape) => {
      displayDetailedInfo(shape);
      console.log('-------------------');
    });
  }
  
  main();