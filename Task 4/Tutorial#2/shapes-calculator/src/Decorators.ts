// src/Decorators.ts
export function Logger(constructor: Function) {
    console.log(`New instance created: ${constructor.name}`);
  }