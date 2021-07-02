# Unstable cyclic import
The ECMAScript module system allows modules to cyclically depend on each other. However, modules must still be initialized one at a time. Normally, a module is initialized after its imported modules, but in the case of cyclic imports, this is not possible. This means that some modules in a cycle must be initialized before all of its imported modules are ready to be used.

When the top-level code of a library depends on a value obtained from a cyclic import, its behavior thus depends on the initialization order. This order is determined by which module is first imported from the main module. Simply adding, removing, or reordering `import` statements can therefore cause the cyclic modules to stop working.

Note that imports that are only used for type annotations in TypeScript files are removed at compile time. Such imports can therefore safely be used in a cycle.


## Recommendation
Cyclic dependencies can be hard to break. There are several approaches that may help:

* Split up the module so that the shared code is separated from the code that depends on the imported value.
* Avoid using the imported value at the top-level, for example, by lazily initializing the variables that depend on it.
* Ensure there are no other importers of the module whose value is used at the top-level. This ensures that the imported module has been initialized.
* Merge two of the modules into a single module.

## Example
In the example below, `services.js` and `audio.js` both depend on each other. As long as `services.js` is imported first, the code works as expected, but if `audio.js` is imported first, the list of services will contain `undefined` instead of the `AudioService` class.


```javascript
// services.js
import { AudioService } from './audio'
import { StoreService } from './store';

export const services = [
  AudioService,
  StoreService
];

export function registerService(service) {
  /* ... */
}

// audio.js
import { registerService } from './services';

export class AudioService {
  static create() {
    registerService(new AudioService());
  }
}

```
One solution is to factor out the `registerService` function into another module which `AudioService` can safely depend on. The `services` module can use a re-export to maintain its original interface:


```javascript
// service_base.js
export function registerService(service) {
  /* ... */
}

// services.js
import { AudioService } from './audio'
import { StoreService } from './store';

export { registerService } from './service_base'

export const services = [
  AudioService,
  StoreService
];

// audio.js
import { registerService } from './service_base';

export class AudioService {
  static create() {
    registerService(new AudioService());
  }
}

```

## References
* Mozilla Developer Network: [Import statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).
