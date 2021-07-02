# Wrong use of 'this' for static method
A method of a class can be either a static method or an instance method. For a static method, the value of `this` is the enclosing class. For an instance method, the value of `this` is the object instance itself. It is therefore not possible to refer to a static method from an instance method using `this`, and vice versa.


## Recommendation
A reference to an instance method from within a static method needs to be qualified with an instance of the class, and not `this`.


## Example
In the following code snippet, the `bar` method is an instance method and it attempts to use the static `baz` method through `this`. That is not possible, so the call will fail at runtime.


```javascript
class Foo {
    bar(){
        this.baz(42);
    }
    static baz(x){
        // ...
    }
}

```
The code should be changed to use the enclosing class instead of `this`: `Foo.baz(42)`.


## References
* Mozilla Developer Network: [Classes and static methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static).
