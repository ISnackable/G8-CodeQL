# Unreachable method overloads
The TypeScript compiler has to choose which specific overload is called when a method with multiple overloads is called. The compiler will always choose the textually first overload that does not give rise to any type errors with the arguments provided at the function call.

This behavior can be unintuitive for programmers unfamiliar with the type system in TypeScript, and can in some instances lead to situations where a programmer writes an overloaded method where only the first overload can ever be used.


## Recommendation
Either reorder the method overloads if an overload with more type parameters is placed before a similar overload with fewer parameters. Alternatively, collapse multiple overloads with identical parameter types by creating a single overload that returns a union of the return types from the multiple overloads.


## Example
In the example below, a programmer has tried to express that a method can return multiple possible values by creating multiple overloads with identical parameter types. However, only the first overload will ever be selected by the TypeScript compiler.


```javascript
interface Foo {
    getParsedThing(id: string): string[];
    getParsedThing(id: string): number[];
    getParsedThing(id: string): object[];
}
```
The error can be fixed by merging the overloads into a single method signature that returns a union of the previous return types.


```javascript
interface Foo {
    getParsedThing(id: string): object[] | number[] | string[];
}
```
In the example below, an interface `Foo` declares a method `create()` with two overloads. The only difference between the two overloads is the type parameter `T` in the first overload. The TypeScript compiler will always use the first overload when `create()` is called, as a default type will be used for the type parameter `T` if none is provided. This default type is `unknown` in TypeScript 3.5+, and `{}` in earlier versions.


```javascript
interface Foo {
    create<T>(a: string): MyObject<T>;
    create(a: string): MyObject<any>;
}
```
In this example, the error has been fixed by switching the order of the two overloads. In this fixed version, if the `create()` method is called with an explicit type argument the second overload will be used, as the first overload would give rise to a type error.


```javascript
interface Foo {
    create(a: string): Array<any>;
    create<T>(a: string): Array<T>;
}
```

## References
* TypeScript specification: [Overload Resolution](https://github.com/microsoft/TypeScript/blob/30cb20434a6b117e007a4959b2a7c16489f86069/doc/spec-ARCHIVED.md#4.15.1)
