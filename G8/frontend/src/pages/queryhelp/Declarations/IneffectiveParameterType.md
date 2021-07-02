# Ineffective parameter type
In TypeScript, the parameters of a function signature must have a name and may optionally have a type. A common mistake is to try to omit the name. This means the type is instead seen as the name. As a result, the parameter type will default to `any` since no type was given.

Parameter names in function signatures are only relevant for documentation purposes but cannot be omitted.


## Recommendation
Give both a name and type to the parameter, as it cannot be given a type without having a name. Alternatively, if the parameter is intentionally untyped, change its name so it does not coincide with a type name.


## Example
In the following example, the callback parameter is written as `(T) => string`, which actually means `(T: any) => string` and is not useful for type checking or code completion.


```javascript
function join<T>(items: T[], callback: (T) => string) {
  return items.map(callback).join(", ")
}

```
Amend this by changing the callback type to `(item: T) => string`. The parameter name `item` is only relevant for documentation purposes, but a name is required regardless.


```javascript
function join<T>(items: T[], callback: (item: T) => string) {
  return items.map(callback).join(", ")
}

```
Untyped parameters are illegal when compiling with the TypeScript flag `--noImplicitAny`.


## References
* [TypeScript Handbook, Functions](https://www.typescriptlang.org/docs/handbook/functions.html)
