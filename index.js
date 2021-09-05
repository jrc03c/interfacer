const ISayHi = { sayHi() {} }
const IDoSomething = { doSomething() {} }

class Base {
  constructor() {
    const self = this

    Object.defineProperty(self, "interfaces", {
      configurable: false,
      enumerable: false,

      set(ifaces) {
        ifaces.forEach(iface => {
          Object.keys(iface).forEach(key => {
            if (!self[key]) {
              self[key] = () => {
                throw new Error(`This object must implement a "${key}" method!`)
              }
            }
          })
        })
      },
    })
  }
}

class Sub extends Base {
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
