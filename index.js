const Interfacer = require("./interfacer.js")
const ISayHi = { sayHi() {} }
const IDoSomething = { doSomething() {} }

class Sub extends Interfacer {
  constructor() {
    super()
    const self = this
    self.interfaces = [ISayHi]
  }

  sayHi() {
    console.log("Heh!")
  }
}

class SubSub extends Sub {
  constructor() {
    super()
    const self = this
    self.interfaces = [IDoSomething]
  }

  doSomething() {
    console.log("I'm doing something!")
  }
}

const s = new SubSub()
s.sayHi()
s.doSomething()
