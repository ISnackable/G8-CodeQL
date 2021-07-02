# Suspicious method name declaration
In TypeScript the keywords `constructor` and `new` for member declarations are used to declare constructors in classes and interfaces respectively. However, a member declaration with the name `new` in an interface or `constructor` in a class, will declare an ordinary method named `new` or `constructor` rather than a constructor. Similarly, the keyword `function` is used to declare functions in some contexts. However, using the name `function` for a class or interface member declaration declares a method named `function`.


## Recommendation
Declare classes as classes and not as interfaces. Use the keyword `constructor` to declare constructors in a class, use the keyword `new` to declare constructors inside interfaces, and don't use `function` when declaring a call signature in an interface.


## Example
The below example declares an interface `Point` with 2 fields and a method called `constructor`. The interface does not declare a class `Point` with a constructor, which was likely what the developer meant to create.


```javascript
declare class Point {
   x: number;
   y: number;
   constructor(x : number, y: number);
}


```
The below example is a fixed version of the above, where the interface is instead declared as a class, thereby describing the type the developer meant in the first place.


```javascript
interface Point {
   x: number;
   y: number;
}

```

## References
* TypeScript specification: [Constructor Type Literals](https://github.com/microsoft/TypeScript/blob/30cb20434a6b117e007a4959b2a7c16489f86069/doc/spec-ARCHIVED.md#3.8.9).
* TypeScript specification: [Constructor Parameters](https://github.com/microsoft/TypeScript/blob/30cb20434a6b117e007a4959b2a7c16489f86069/doc/spec-ARCHIVED.md#8.3.1).
