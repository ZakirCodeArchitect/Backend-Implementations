"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = Logger;
// src/Decorators.ts
function Logger(constructor) {
    console.log(`New instance created: ${constructor.name}`);
}
