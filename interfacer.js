class Interfacer {
  constructor() {
    const self = this

    function helper(ifaces) {
      ifaces.forEach(iface => {
        if (!(iface instanceof Object)) {
          throw new Error("Each interface must be a plain, shallow object!")
        }

        Object.keys(iface).forEach(key => {
          if (!self[key] || typeof self[key] !== "function") {
            self[key] = () => {
              throw new Error(
                `The \`${self.constructor.name}\` class must implement a \`${key}()\` method!`
              )
            }
          }
        })
      })
    }

    Object.defineProperty(self, "interfaces", {
      configurable: false,
      enumerable: false,

      set(ifaces) {
        if (!ifaces) return

        if (!(ifaces instanceof Array)) {
          throw new Error(
            "The `interfaces` property must be set with an array of interface objects!"
          )
        }

        helper(ifaces)
      },
    })

    Object.defineProperty(self, "implements", {
      configurable: false,
      enumerable: false,

      set(ifaces) {
        if (!ifaces) return

        if (!(ifaces instanceof Array)) {
          throw new Error(
            "The `implements` property must be set with an array of interface objects!"
          )
        }

        helper(ifaces)
      },
    })
  }
}

module.exports = Interfacer
