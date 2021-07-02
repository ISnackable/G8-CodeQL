# Server crash
Servers handle requests from clients until terminated deliberately by a server administrator. A client request that results in an uncaught server-side exception causes the current server response generation to fail, and should not have an effect on subsequent client requests.

Under some circumstances, uncaught exceptions can however cause the entire server to terminate abruptly. Such a behavior is highly undesirable, especially if it gives malicious users the ability to turn off the server at will, which is an efficient denial-of-service attack.


## Recommendation
Ensure that the processing of client requests can not cause uncaught exceptions to terminate the entire server abruptly.


## Example
The following server implementation checks if a client-provided file path is valid and throws an exception if the check fails. It can be seen that the exception is uncaught, and it is therefore reasonable to expect the server to respond with an error response to client requests that cause the check to fail. But since the exception is uncaught in the context of an asynchronous callback invocation (`fs.access(...)`), the entire server will terminate instead.


```javascript
const express = require("express"),
  fs = require("fs");

function save(rootDir, path, content) {
  if (!isValidPath(rootDir, req.query.filePath)) {
    throw new Error(`Invalid filePath: ${req.query.filePath}`); // BAD crashes the server
  }
  // write content to disk
}
express().post("/save", (req, res) => {
  fs.exists(rootDir, (exists) => {
    if (!exists) {
      console.error(`Server setup is corrupted, ${rootDir} does not exist!`);
      res.status(500);
      res.end();
      return;
    }
    save(rootDir, req.query.path, req.body);
    res.status(200);
    res.end();
  });
});

```
To remedy this, the server can catch the exception explicitly with a `try/catch` block, and generate an appropriate error response instead:


```javascript
// ...
express().post("/save", (req, res) => {
  fs.exists(rootDir, (exists) => {
    // ...
    try {
      save(rootDir, req.query.path, req.body); // GOOD no uncaught exception
      res.status(200);
      res.end();
    } catch (e) {
      res.status(500);
      res.end();
    }
  });
});

```
An alternative is to use an `async` and `await` for the asynchronous behavior, since the server will then print warning messages about uncaught exceptions instead of terminating, unless the server was started with the commandline option `--unhandled-rejections=strict`:


```javascript
// ...
express().post("/save", async (req, res) => {
  if (!(await fs.promises.exists(rootDir))) {
    console.error(`Server setup is corrupted, ${rootDir} does not exist!`);
    res.status(500);
    res.end();
    return;
  }
  save(rootDir, req.query.path, req.body); // MAYBE BAD, depends on the commandline options
  res.status(200);
  res.end();
});

```

## References
* Common Weakness Enumeration: [CWE-248](https://cwe.mitre.org/data/definitions/248.html).
* Common Weakness Enumeration: [CWE-730](https://cwe.mitre.org/data/definitions/730.html).
