
------ Partial ------

export type Partial<T> = {
  [P in keyof T] ?: T[P]
}

type Point = {x: number, y: number};

update(next: Partial<T>) {
  setState({...currentState, next});
}

----- Required ----------
export type Required<T> = {
  [P in keyof T] -? : T[P];
}


Readonly
--------
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

Record
--------
type Persons = Record<string, {name: string, age: number}>;
const persons: Persons = {};
persons['1'] =  {name: "Pankaj", age: 12};
persons['2'] = {name: "abac" } // will give error

undefined vs optional
------------------------
function logOptional(error?: Error, message: string) {}
-> In this case if the error is not passed then it will go to a string,
function logOptional(error: Error | undefined, message: string) {} 
-> Can pass undefined as the first parameter

const str: string = 'key';
const num: number = 1337;

PropertyKey -> Type for keys of object 
It can be string | number | symbol


--------ThisType-------
type Math = {
  double(): void,
  half(): void,
}
export const math: Math & ThisType<{value: number}> = {
  double() {
    this.value *= 2;
  }
  half() {
    this.value /= 2;
  }
}

const obj = {
  value: 10,
  ...math
}
obj.double();
obj.half();

eg: 
type StateDescription<D, M>: {
  data: D;
  methods: M & ThisType<D & M>; 
}

function createStore<D, M>(desc: StateDescription<D, M>): D & M {
  return {...desc.data, ...desc.methods};
}
let state = createStore({
  data: {x: 0, y: 0},
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx;   // This should have access to data and methods
      this.y += dy;
    }
  }
});

state.x = 10;
state.y = 20;
state.moveBy(5, 5);

-----------Awaited--------

type WrappedInProm = Promise<Promise<Promise<string>>>;
type AwaitedResult = Awaited<WrappedInProm>;  // string;

------- String Manipulation -------
Uppercase
Lowercase
Capitalize
Uncapitalize

type Getter<T extends string> = `get${Capitalize<T>}`;
type Setter<T extends string> = `set${Capitalize<T>}`;

type Name = 'name';

type GetName = Getter<Name>; // getName
type SetName = Setter<Name>; // setName

export type Setters<State> = {
  [k in keyof State & string as `set${Capitalize(K)}`]: (value: State[K]) => void,
}
export type Getters<State> = {
  [k in typeof State & string as `get${Capitalize(K)}`]: () => State[k];
}
export Store<State> = Setters<State> & Getters<State>;

type PersonState = {
  name: string;
  age: number;
}

type PersonStore  = Store<PersonState>;
declare const personStore: PersonStore;
personStore.setName("ABC");
personStore.setAge(20);

--------- Intersaction ----------
type A = {name: string}
type B = {age: 10}
const Obj = A | B | (A & B)

------ ENUM ------

export const LoginMode = {
  device: 'device',
  email: 'email',
  social: 'social',
} as const;

export type LoginMode = keyof typeof LoginMode; // device | email | social




