"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
const ShapeType_1 = require("./ShapeType");
class Circle {
    constructor(radius) {
        this.radius = radius;
        this.type = ShapeType_1.ShapeType.Circle;
    }
    getArea() {
        return Math.PI * this.radius ** 2;
    }
    getPerimeter() {
        return 2 * Math.PI * this.radius;
    }
}
exports.Circle = Circle;
