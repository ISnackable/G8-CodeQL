# Arrow method on Vue instance
The Vue framework invokes the methods of a Vue instance with the instance as the receiver. It is however impossible to perform this binding of instance and receiver for arrow functions, so the `this` variable in an arrow function on a Vue instance may not have the value that the programmer expects.


## Recommendation
Ensure that the methods on a Vue instance can have their receiver bound to the instance.


## Example
The following example shows two similar Vue instances, the only difference is how the `created` life cycle hook callback is defined. The first Vue instance uses an arrow function as the callback. This means that the `this` variable will have the global object as its value, causing `this.myProperty` to evaluate to `undefined`, which may not be intended. Instead, the second Vue instance uses an ordinary function as the callback, causing `this.myProperty` to evaluate to `42`.


```javascript
new Vue({
  data: {
    myProperty: 42
  },
  created: () => {
    // BAD: prints: "myProperty is: undefined"
    console.log('myProperty is: ' + this.myProperty);
  }
});

new Vue({
  data: {
    myProperty: 42
  },
  created: function () {
    // GOOD: prints: "myProperty is: 1"
    console.log('myProperty is: ' + this.myProperty);
  }
});

```

## References
* Vue documentation: [The Vue Instance](https://vuejs.org/v2/guide/instance.html)
