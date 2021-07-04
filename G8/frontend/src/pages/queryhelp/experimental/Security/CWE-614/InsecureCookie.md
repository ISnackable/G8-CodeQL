# Failure to set secure cookies
Failing to set the 'secure' flag on a cookie can cause it to be sent in cleartext. This makes it easier for an attacker to intercept.


## Recommendation
Always set the `secure` flag to \`true\` on a cookie before adding it to an HTTP response (if the default value is \`false\`).


## References
* Production Best Practices: Security:[Use cookies securely](https://expressjs.com/en/advanced/best-practice-security.html#use-cookies-securely).
* NodeJS security cheat sheet:[Set cookie flags appropriately](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#set-cookie-flags-appropriately).
* express-session:[cookie.secure](https://github.com/expressjs/session#cookiesecure).
* cookie-session:[Cookie Options](https://github.com/expressjs/cookie-session#cookie-options).
* [express response.cookie](https://expressjs.com/en/api.html#res.cookie).
* [Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie).
* [js-cookie](https://github.com/js-cookie/js-cookie).
* Common Weakness Enumeration: [CWE-614](https://cwe.mitre.org/data/definitions/614.html).
