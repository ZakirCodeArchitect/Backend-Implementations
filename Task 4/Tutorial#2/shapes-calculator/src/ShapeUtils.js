"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayShapeInfo = displayShapeInfo;
exports.displayDetailedInfo = displayDetailedInfo;
const Rectangle_1 = require("./Rectangle");
function displayShapeInfo(shape) {
    console.log(`Shape Type: ${shape.type}`);
    console.log(`Area: ${shape.getArea().toFixed(2)}`);
    console.log(`Perimeter: ${shape.getPerimeter().toFixed(2)}`);
}
function isCircle(shape) {
    return shape.type === 'CIRCLE';
}
function displayDetailedInfo(shape) {
    displayShapeInfo(shape);
    if (isCircle(shape)) {
        console.log(`Radius: ${shape.radius}`);
    }
    else if (shape instanceof Rectangle_1.Rectangle) {
        console.log(`Width: ${shape.width}`);
        console.log(`Height: ${shape.height}`);
    }
}
