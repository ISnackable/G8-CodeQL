# Use of returnless function
JavaScript functions that do not return an expression will implicitly return `undefined`. Using the implicit return value from such a function is not an error in itself, but it is a pattern indicating that some misunderstanding has occurred.


## Recommendation
Do not use the return value from a function that does not return an expression.


## Example
In the example below, the function `renderText` is used to render text through side effects, and the function does not return an expression. However, the programmer still uses the return value from `renderText` as if the function returned an expression, which is clearly an error.


```javascript
var stage = require("./stage")

function renderText(text, id) {
    document.getElementById(id).innerText = text;
}

var text = renderText("Two households, both alike in dignity", "scene");

stage.show(text);
```
The program can be fixed either by removing the use of the value returned by `renderText`, or by changing the `renderText` function to return an expression.


## References
* Mozilla Developer Network: [Return](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return).
