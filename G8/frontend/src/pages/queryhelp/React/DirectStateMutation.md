# Direct state mutation
React components have a `state` property. This property contains data associated with the component that may change over time. Although properties of the state object can be read freely, they should not be updated directly, since such modifications could be overwritten by asynchronous updates performed by `setState`.


## Recommendation
Rewrite the code to use `setState` instead.


## Example
The following example component uses `setInterval` to register method `tick` as a callback that is invoked every second and updates `state.now` directly:

```javascript

class Clock extends React.Component {
  componentDidMount() {
    setInterval(() => this.tick(), 1000);
  }
  tick() {
    this.state.now = Date.now();
  }
}

```
Instead, `setState` should be used:

```javascript

class Clock extends React.Component {
  componentDidMount() {
    setInterval(() => this.tick(), 1000);
  }
  tick() {
    this.setState({ now: Date.now() });
  }
}

```

## References
* React Quick Start: [State and Lifecycle](https://facebook.github.io/react/docs/state-and-lifecycle.html).
