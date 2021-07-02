# 'HttpOnly' attribute is not set to true
Cookies without `HttpOnly` flag are accessible to JavaScript running in the same origin. In case of Cross-Site Scripting (XSS) vulnerability the cookie can be stolen by malicious script.


## Recommendation
Protect sensitive cookies, such as those related to authentication, by setting `HttpOnly` to `true` to make them not accessible to JavaScript.


## References
* Production Best Practices: Security:[Use cookies securely](https://expressjs.com/en/advanced/best-practice-security.html#use-cookies-securely).
* NodeJS security cheat sheet:[Set cookie flags appropriately](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#set-cookie-flags-appropriately).
* express-session:[cookie.httpOnly](https://github.com/expressjs/session#cookiehttponly).
* cookie-session:[Cookie Options](https://github.com/expressjs/cookie-session#cookie-options).
* [express response.cookie](https://expressjs.com/en/api.html#res.cookie).
* [Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie).
* Common Weakness Enumeration: [CWE-1004](https://cwe.mitre.org/data/definitions/1004.html).
