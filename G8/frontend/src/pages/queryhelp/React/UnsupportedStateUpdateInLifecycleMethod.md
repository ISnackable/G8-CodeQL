# Unsupported state update in lifecycle method
The three builtin React component methods `setState`, `replaceState`, and `forceUpdate` can update the state of a component asynchronously. It is, however, not recommended to invoke these methods at certain points in the lifecycle of the component.

For instance, invoking one of the state update methods during a call to `render` will cause React to throw an exception because the `render` method must be pure. Invoking one of the state update methods from the constructor of a component is also forbidden because the component is not mounted at that point in time. The three component methods `componentDidUpdate`, `componentWillUpdate`, and `shouldComponentUpdate` do allow calls to the state update methods, but only if the calls are conditional.


## Recommendation
Only invoke a state update method on a React component when its lifecycle allows it.


## Example
The following example uses `setState` to update the `counter` property of `this.state`, from the constructor of a React component:


```javascript
class MyComponent extends React.Component {

    constructor(props) {
        super(props)
        this.setState({
            counter: 0
        })

    }

    render() {
        return <div>{this.state.counter}</div>
    }

}

```
Instead, replace the call to `setState` with an assignment:


```javascript
class MyComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state.counter = 0;
    }

    render() {
        return <div>{this.state.counter}</div>
    }

}

```

## References
* React reference: [React.Component](https://reactjs.org/docs/react-component.html).
* React Quick Start: [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html).
