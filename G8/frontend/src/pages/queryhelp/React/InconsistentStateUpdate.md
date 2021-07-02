# Potentially inconsistent state update
React component state updates using `setState` may asynchronously update `this.props` and `this.state`, thus it is not safe to use either of the two when calculating the new state passed to `setState`.


## Recommendation
Use the callback-based variant of `setState`: instead of calculating the new state directly and passing it to `setState`, pass a callback function that calculates the new state when the update is about to be performed.


## Example
The following example uses `setState` to update the `counter` property of `this.state`, relying on the current (potentially stale) value of that property:

```javascript

this.setState({
  counter: this.state.counter + 1
});

```
Instead, the callback form of `setState` should be used:

```javascript

this.setState(prevState => ({
  counter: prevState.counter + 1
}));

```

## References
* React Quick Start: [State and Lifecycle](https://facebook.github.io/react/docs/state-and-lifecycle.html).
