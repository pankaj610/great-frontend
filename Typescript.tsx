



Readonly

export type ReadOnly<T> = {
  readonly [k in keyof T]: T[k];
}

type Point = { x: number, y: number };

type ReadonlyType = ReadOnly<Point>;


Eg:

function makeReadonly<T>(object: T): Readonly<T> {
    return Object.freeze({...object});
}

const editablePoint = {x: 0, y: 0};
editablePoint.x = 10;

const readOnlyPoint = makeReadonly(editablePoint);
readOnlyPoint.x = 10; // give error 

