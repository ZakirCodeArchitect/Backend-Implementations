"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const Circle_1 = require("./Circle");
const Rectangle_1 = require("./Rectangle");
const ShapeUtils_1 = require("./ShapeUtils");
const circle = new Circle_1.Circle(5);
const rectangle = new Rectangle_1.Rectangle(4, 6);
(0, ShapeUtils_1.displayDetailedInfo)(circle);
console.log('-------------------');
(0, ShapeUtils_1.displayDetailedInfo)(rectangle);
