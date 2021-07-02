# Missing await
In JavaScript, `async` functions always return a promise object. To obtain the underlying value of the promise, use the `await` operator or call the `then` method. Attempting to use a promise object instead of its underlying value can lead to unexpected behavior.


## Recommendation
Use the `await` operator to get the value contained in the promise. Alternatively, call `then` on the promise and use the value passed to the callback.


## Example
In the following example, the `getData` function returns a promise, and the caller checks if the returned promise is `null`:


```javascript
async function getData(id) {
  let req = await fetch(`https://example.com/data?id=${id}`);
  if (!req.ok) return null;
  return req.json();
}

async function showData(id) {
  let data = getData(id);
  if (data == null) {
    console.warn("No data for: " + id);
    return;
  }
  // ...
}

```
However, the null check does not work as expected. The `return null` statement on line 2 actually returns a *promise* containing the `null` value. Since the promise object itself is not equal to `null`, the error check is bypassed.

The issue can be corrected by inserting `await` before the promise:


```javascript
async function getData(id) {
  let req = await fetch(`https://example.com/data?id=${id}`);
  if (!req.ok) return null;
  return req.json();
}

async function showData(id) {
  let data = await getData(id);
  if (data == null) {
    console.warn("No data for: " + id);
    return;
  }
  // ...
}

```

## References
* MDN: [Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
* MDN: [Async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
* MDN: [Await operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
