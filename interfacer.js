class Interfacer {
  constructor() {
    const self = this

    function helper(ifaces) {
      ifaces.forEach(iface => {
        Object.keys(iface).forEach(key => {
          if (!self[key]) {
            self[key] = () => {
              throw new Error(`This object must implement a "${key}" method!`)
            }
          }
        })
      })
    }

    Object.defineProperty(self, "interfaces", {
      configurable: false,
      enumerable: false,

      set(ifaces) {
        helper(ifaces)
      },
    })

    Object.defineProperty(self, "implements", {
      configurable: false,
      enumerable: false,

      set(ifaces) {
        helper(ifaces)
      },
    })
  }
}

module.exports = Interfacer
