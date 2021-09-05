# Intro

**interfacer.js** is just a little experiment with adding interfaces to JS.

# Installation

```bash
npm install --save https://github.com/jrc03c/interfacer.js
```

# Usage

This library provides an `Interfacer` class that must be extended, like this:

```js
const Interfacer = require("@jrc03c/interfacer.js")

// `ISayHi` is the interface our classes should implement.
const ISayHi = {
  sayHi() {},
}

// We'll define our classes as subclasses of the `Interfacer` class.
// In the constructor, we'll set the `interfaces` property to indicate
// which interfaces must be implemented.
class Person extends Interfacer {
  constructor() {
    super()
    this.interfaces = [ISayHi]
  }

  sayHi() {
    console.log("Hi! I'm a person!")
  }
}

class Robot extends Interfacer {
  constructor() {
    super()
    this.interfaces = [ISayHi]
  }
}
```

Note that the `Robot` class has not implemented the `sayHi()` method yet! If we tried to make a new `Robot` and invoke its `sayHi()` method, we'd get an error:

```bash
The "Robot" class must implement a "sayHi" method!
```

Each interface must be a plain, shallow JS object where each property of the object is a function (as in the `ISayHi` interface above). The `interfaces` property of any subclass of `Interfacer` can be set with an array of such interface objects.
