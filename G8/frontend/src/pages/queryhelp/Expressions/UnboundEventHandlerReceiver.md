# Unbound event handler receiver
Event handler callbacks are usually invoked as functions, not as methods. This means that the `this` expressions of such callbacks evaluate to `undefined` or the global object. Using an ES6 class method as a callback therefore means that the `this` expressions of the method do not refer to the class instance.


## Recommendation
Ensure that the receiver object of event handler methods that use `this` expressions is not `undefined`. For instance, you can use `bind` or explicitly invoke the method as a method call.


## Example
The following example, for the React framework, registers the `handleClick` method as an event handler for the `click` event:


```javascript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}> // BAD `this` is now undefined in `handleClick`
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

```
This is problematic since this invokes `handleClick` as a function call instead of a method call, meaning that `this` is `undefined` inside `handleClick`.

Instead, bind the receiver of `handleClick` in the constructor:


```javascript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}> // GOOD, the constructor binds `handleClick`
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

```

## References
* React Quick Start: [Handling Events](https://reactjs.org/docs/handling-events.html).
