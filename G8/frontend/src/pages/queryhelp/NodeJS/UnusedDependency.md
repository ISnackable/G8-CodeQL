# Unused npm dependency
Specifying an unused dependency in `package.json` may make packages harder to install. The unused dependency will still be downloaded by npm, and if it conflicts with another package installation will become difficult or impossible.

Dependencies on packages that are only used during development (such as testing frameworks or linters) should be listed under `devDependencies` rather than `dependencies`, since they are not required for deployment.


## Recommendation
Remove the unused dependency.


## Example
In the following example, the `package.json` file specifies dependencies on both `acorn` and `esprima`, but in fact only `acorn` is used. The dependency on `esprima` can simply be removed.


```javascript
// package.json
{
  "name": "example-package",
  "version": "0.1.0",
  "dependencies": {
    "acorn": "*",
    "esprima": "~2.0.0"
  }
}

// index.js
var acorn = require('acorn'),
    fs = require('fs');
acorn.parse(fs.readFileSync('tst.js'), 'utf-8');
```
As another example, the following `package.json` file specifies a dependency on `eslint-plugin-babel`, a plugin for a popular linter:

```javascript

{
  "name": "another-example-package",
  "version": "0.1.0",
  "dependencies": {
    "eslint-plugin-babel": "3.3.0"
  }
}

```
Since this dependency is only used during development, it should instead be listed under `devDependencies`:

```javascript

{
  "name": "another-example-package",
  "version": "0.1.0",
  "devDependencies": {
    "eslint-plugin-babel": "3.3.0"
  }
}

```

## References
* NPM Manual: [package.json](https://docs.npmjs.com/cli/v7/configuring-npm/package-json).
