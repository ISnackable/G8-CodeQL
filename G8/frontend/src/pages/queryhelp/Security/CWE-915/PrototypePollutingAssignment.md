# Prototype-polluting assignment
Most JavaScript objects inherit the properties of the built-in `Object.prototype` object. Prototype pollution is a type of vulnerability in which an attacker is able to modify `Object.prototype`. Since most objects inherit from the compromised `Object.prototype` object, the attacker can use this to tamper with the application logic, and often escalate to remote code execution or cross-site scripting.

One way to cause prototype pollution is by modifying an object obtained via a user-controlled property name. Most objects have a special `__proto__` property that refers to `Object.prototype`. An attacker can abuse this special property to trick the application into performing unintended modifications of `Object.prototype`.


## Recommendation
Use an associative data structure that is resilient to untrusted key values, such as a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map). In some cases, a prototype-less object created with [Object.create(null)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) may be preferable.

Alternatively, restrict the computed property name so it can't clash with a built-in property, either by prefixing it with a constant string, or by rejecting inputs that don't conform to the expected format.


## Example
In the example below, the untrusted value `req.params.id` is used as the property name `req.session.todos[id]`. If a malicious user passes in the ID value `__proto__`, the variable `todo` will then refer to `Object.prototype`. Finally, the modification of `todo` then allows the attacker to inject arbitrary properties onto `Object.prototype`.


```javascript
let express = require('express');

express.put('/todos/:id', (req, res) => {
    let id = req.params.id;
    let items = req.session.todos[id];
    if (!items) {
        items = req.session.todos[id] = {};
    }
    items[req.query.name] = req.query.text;
    res.end(200);
});

```
One way to fix this is to use [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) objects to associate key/value pairs instead of regular objects, as shown below:


```javascript
let express = require('express');

express.put('/todos/:id', (req, res) => {
    let id = req.params.id;
    let items = req.session.todos.get(id);
    if (!items) {
        items = new Map();
        req.sessions.todos.set(id, items);
    }
    items.set(req.query.name, req.query.text);
    res.end(200);
});

```

## References
* MDN: [Object.prototype.__proto__](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)
* MDN: [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
* Common Weakness Enumeration: [CWE-78](https://cwe.mitre.org/data/definitions/78.html).
* Common Weakness Enumeration: [CWE-79](https://cwe.mitre.org/data/definitions/79.html).
* Common Weakness Enumeration: [CWE-94](https://cwe.mitre.org/data/definitions/94.html).
* Common Weakness Enumeration: [CWE-400](https://cwe.mitre.org/data/definitions/400.html).
* Common Weakness Enumeration: [CWE-915](https://cwe.mitre.org/data/definitions/915.html).
