# Unresolvable import
Node.js modules can be imported either directly by specifying a file or folder, or indirectly by specifying a module name, which will be looked up in a `node_modules` folder. In the latter case, care should be taken that the imported module is either bundled with the code that uses it, or declared as a dependency in the `package.json` file to ensure that the import does not fail at runtime.


## Recommendation
Declare the dependency in the `package.json` file or include an externs file for it during extraction.

Externs files for all the core packages of Node.js are available in the `tool/data/externs/nodejs` directory of the distribution, and are included by default for projects created using bootstrap.


## Example
In the following example, the `package.json` file specifies no dependencies, but `index.js` imports `acorn`. This import will fail unless a copy of `acorn` happens to be installed (for instance in the user's `node_modules` folder). On the other hand, the import of `fs` is unproblematic, since `fs` is a standard module that is included with every Node.js installation.


```javascript
// package.json
{
  "name": "example-package",
  "version": "0.1.0"
}

// index.js
var acorn = require('acorn'),
    fs = require('fs');
acorn.parse(fs.readFileSync('tst.js'), 'utf-8');
```
The dependency on `acorn` should be declared in the `package.json` file:


```javascript
// package.json
{
  "name": "example-package",
  "version": "0.1.0",
  "dependencies": {
    "acorn": "*"
  }
}

// index.js
var acorn = require('acorn'),
    fs = require('fs');
acorn.parse(fs.readFileSync('tst.js'), 'utf-8');
```

## References
* Node.js Manual: [Module resolution algorithm](https://nodejs.org/api/modules.html#modules_all_together).
