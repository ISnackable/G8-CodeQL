# Missing 'this' qualifier
JavaScript methods can call other methods of the same class instance through the use of the `this` keyword. In other object-oriented languages such as Java, the use of the `this` keyword for such method calls is optional. It is however *not* optional in JavaScript. If the `this` keyword is left out, the call is a regular function call.


## Recommendation
Add the `this` keyword as the receiver of the call.


## Example
In the following example, the call to `setAudioProperties` will call an undeclared global function, and *not* the method defined later in the class.


```javascript
class Audio3D {
  setAudioStream(){
    // ...
    setAudioProperties();
    // ...
  }

  setAudioProperties(){
    // ...  
  }
}
```
The problem can be fixed by adding the `this` keyword to the call: `this.setAudioProperties()`.


## References
* MDN: [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
