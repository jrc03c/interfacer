const Interfacer = require("./interfacer.js")

test("tests that the Interfacer class can be subclassed without any additional effort", () => {
  expect(() => {
    class Sub extends Interfacer {}
    const s = new Sub()
  }).not.toThrow()
})

test("tests that any number of interfaces can be added", () => {
  const IDoThis = { doThis() {} }
  const IDoThat = { doThat() {} }
  const IDoTheOther = { doTheOther() {} }

  class Sub extends Interfacer {
    constructor() {
      super()
      const self = this
      self.interfaces = [IDoThis, IDoThat, IDoTheOther]
    }

    doThis = () => "this"
    doThat = () => "that"
    doTheOther = () => "the other"
  }

  expect(() => {
    const s = new Sub()
    s.doThis()
    s.doThat()
    s.doTheOther()
  }).not.toThrow()
})

test("tests that interfaces can be stacked / nested / overridden in subclasses", () => {
  const ISayHi = { sayHi() {} }
  const IDoTheChores = { doTheChores() {} }
  const ISing = { sing() {} }

  class A extends Interfacer {
    constructor() {
      super()
      const self = this
      self.interfaces = [ISayHi]
    }

    sayHi = () => "hi"
  }

  class B extends A {
    constructor() {
      super()
      const self = this
      self.interfaces = [IDoTheChores]
    }

    doTheChores = () => "chores"
  }

  class C extends B {
    constructor() {
      super()
      const self = this
      self.interfaces = [ISing]
    }

    sing = () => "singing"
    doTheChores = () => "cleaning my room"
  }

  const c = new C()
  expect(c.sayHi()).toBe("hi")
  expect(c.doTheChores()).toBe("cleaning my room")
  expect(c.sing()).toBe("singing")
})

test("tests that interfaces can't be set in weird ways", () => {
  class A extends Interfacer {
    constructor() {
      super()
      const self = this
      self.interfaces = "nope"
    }
  }

  expect(() => {
    const a = new A()
  }).toThrow()

  class B extends Interfacer {
    constructor() {
      super()
      const self = this
      self.interfaces = ["foo", "bar", "baz"]
    }
  }

  expect(() => {
    const b = new B()
  }).toThrow()
})
