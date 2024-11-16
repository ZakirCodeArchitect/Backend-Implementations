"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
const ShapeType_1 = require("./ShapeType");
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.type = ShapeType_1.ShapeType.Rectangle;
    }
    getArea() {
        return this.width * this.height;
    }
    getPerimeter() {
        return 2 * (this.width + this.height);
    }
}
exports.Rectangle = Rectangle;
