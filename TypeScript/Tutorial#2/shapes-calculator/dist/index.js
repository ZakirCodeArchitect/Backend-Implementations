"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const Circle_1 = require("./Circle");
const Rectangle_1 = require("./Rectangle");
const ShapeUtils_1 = require("./ShapeUtils");
const ShapeService_1 = require("./ShapeService");
const circle = new Circle_1.Circle(5);
const rectangle = new Rectangle_1.Rectangle(4, 6);
(0, ShapeUtils_1.displayDetailedInfo)(circle);
console.log('-------------------');
(0, ShapeUtils_1.displayDetailedInfo)(rectangle);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const shapes = yield (0, ShapeService_1.fetchShapeData)();
        shapes.forEach((shape) => {
            (0, ShapeUtils_1.displayDetailedInfo)(shape);
            console.log('-------------------');
        });
    });
}
main();
