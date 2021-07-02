# Log injection
If unsanitized user input is written to a log entry, a malicious user may be able to forge new log entries.

Forgery can occur if a user provides some input with characters that are interpreted when the log output is displayed. If the log is displayed as a plain text file, then new line characters can be used by a malicious user. If the log is displayed as HTML, then arbitrary HTML may be included to spoof log entries.


## Recommendation
User input should be suitably sanitized before it is logged.

If the log entries are in plain text then line breaks should be removed from user input, using `String.prototype.replace` or similar. Care should also be taken that user input is clearly marked in log entries.

For log entries that will be displayed in HTML, user input should be HTML-encoded before being logged, to prevent forgery and other forms of HTML injection.


## Example
In the first example, a username, provided by the user, is logged using \`console.info\`. In the first case, it is logged without any sanitization. In the second case, the username is used to build an error that is logged using \`console.error\`. If a malicious user provides \`username=Guest%0a\[INFO\]+User:+Admin%0a\` as a username parameter, the log entry will be splitted in two different lines, where the second line will be \`\[INFO\]+User:+Admin\`.


```javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    let q = url.parse(req.url, true);

    console.info(`[INFO] User: ${q.query.username}`); // BAD: User input logged as-is
})

server.listen(3000, '127.0.0.1', () => {});

```
In the second example, `String.prototype.replace` is used to ensure no line endings are present in the user input.


```javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    let q = url.parse(req.url, true);

    // GOOD: remove newlines from user controlled input before logging
    let username = q.query.username.replace(/\n|\r/g, "");

    console.info(`[INFO] User: ${username}`);
});

server.listen(3000, '127.0.0.1', () => {});

```

## References
* OWASP: [Log Injection](https://www.owasp.org/index.php/Log_Injection).
* Common Weakness Enumeration: [CWE-117](https://cwe.mitre.org/data/definitions/117.html).
