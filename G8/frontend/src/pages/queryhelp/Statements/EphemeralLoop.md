# Loop body executes at most once
If the body of a loop can only execute at most once, then the whole loop is equivalent to an `if` conditional. This is confusing for readers, and may even indicate a logic error.


## Recommendation
Replace the loop with a conditional.


## Example
In the following example, the function `nextToken` reads a value `c` from a `reader`, and then enters a `while` loop if `c` is not falsy. Inside the loop body, it performs a `switch` on `c`, taking different actions depending on its value. After the `switch`, it then unconditionally breaks out of the loop.

In other words, the loop body either does not execute at all (if `c` is falsy), or exactly once (if it is truthy), but never more than once.


```javascript
function nextToken(reader){
  var c = reader.read(), token = null;

  while (c) {
    switch(c) {
    case "/":
      if(reader.peek() == "*")
        token = commentToken(reader, c, startLine, startCol);
      else
        token = charToken(reader, c, startLine, startCol);
      break;
    case '"':
    case "'":
      token = stringToken(c, startLine, startCol);
      break;
    default:
      token = charToken(reader, c, startLine, startCol);
    }

    break;
  }

  return token;
}
```
Assuming that this is the desired behavior, the `while` loop should be replaced with an `if` statement as follows:


```javascript
function nextToken(reader){
  var c = reader.read(), token = null;

  if (c) {
    switch(c) {
    case "/":
      if(reader.peek() == "*")
        token = commentToken(reader, c, startLine, startCol);
      else
        token = charToken(reader, c, startLine, startCol);
      break;
    case '"':
    case "'":
      token = stringToken(c, startLine, startCol);
      break;
    default:
      token = charToken(reader, c, startLine, startCol);
    }
  }

  return token;
}
```

## References
* Mozilla Developer Network: [Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration).
