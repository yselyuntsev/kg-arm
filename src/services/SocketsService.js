import CONFIG from './ConfigurationService'

export default {
  socket: null,
  active: false,
  config: CONFIG.getCurrent(),

  /**
   * Open WebSocket connection
   */
  open () {
    this.socket = new WebSocket(`ws://${this.config.websocketUrl}`)

    this.socket.onopen = () => {
      this.active = true
    }

    this.socket.onclose = (event) => {
      if (!event.wasClean) {
        setTimeout(() => this.open(), 5000)
      }
      this.active = false
    }
  },

  /**
   * Close correctly WebSocket connection
   */
  close () {
    if (this.active) {
      this.socket.close()
    }
  },

  /**
   * Send data on WebSocket connection
   * @param {String} type Send type message
   * @param {Object} message Send data object
   */
  send (type, body) {
    let data = {
      type,
      body
    }

    this.socket.send(JSON.stringify(data))
  },

  /**
   * Listen WebSockets on available messages. After get request, call callback function.
   * @param {String} type Send type message
   * @param {Function} callback Callback function
   */
  on (callback) {
    this.socket.onmessage = (event) => {
      let data = JSON.parse(event.data)
      callback(data)
    }
  }
}
