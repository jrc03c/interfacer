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

module.exports = Base
