# Missing `MessageEvent.origin` verification in `postMessage` handlers
If you use cross-origin communication between Window objects and do expect to receive messages from other sites, always verify the sender's identity using the origin and possibly source properties of the recevied \`MessageEvent\`.

Unexpected behaviours, like \`DOM-based XSS\` could occur, if the event handler for incoming data does not check the origin of the data received and handles the data in an unsafe way.


## Recommendation
Always verify the sender's identity of incoming messages.


## Example
In the first example, the \`MessageEvent.data\` is passed to the \`eval\` function withouth checking the origin. This means that any window can send arbitrary messages that will be executed in the window receiving the message


```javascript
function postMessageHandler(event) {
    let origin = event.origin.toLowerCase();

    console.log(origin)
    // BAD: the origin property is not checked
    eval(event.data);
}

window.addEventListener('message', postMessageHandler, false);

```
In the second example, the \`MessageEvent.origin\` is verified with an unsecure check. For example, using \`event.origin.indexOf('www.example.com') &gt; -1\` can be bypassed because the string \`www.example.com\` could appear anywhere in \`event.origin\` (i.e. \`www.example.com.mydomain.com\`)


```javascript
function postMessageHandler(event) {
    let origin = event.origin.toLowerCase();

    let host = window.location.host;

    // BAD
    if (origin.indexOf(host) === -1)
        return;


    eval(event.data);
}

window.addEventListener('message', postMessageHandler, false);
```
In the third example, the \`MessageEvent.origin\` is properly checked against a trusted origin.


```javascript
function postMessageHandler(event) {
    console.log(event.origin)
    // GOOD: the origin property is checked
    if (event.origin === 'www.example.com') {
        // do something
    }
}

window.addEventListener('message', postMessageHandler, false);
```

## References
* [CWE-020: Improper Input Validation](https://cwe.mitre.org/data/definitions/20.html)
* [Window.postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
* [Web-message manipulation](https://portswigger.net/web-security/dom-based/web-message-manipulation)
* [The pitfalls of postMessage](https://labs.detectify.com/2016/12/08/the-pitfalls-of-postmessage/)
* Common Weakness Enumeration: [CWE-20](https://cwe.mitre.org/data/definitions/20.html).
