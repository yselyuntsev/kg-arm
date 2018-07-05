export default {
  /**
   * Default system configuration
   */
  _defaultConfiguration: {
    origin: location.origin,
    apiUrl: '/api/v1/',
    token: 'asdfjsdkfhsdfjsdhf',
    websocketUrl: 'localhost:1082'
  },

  /**
   * Store configuration in localStorage
   * Saves new configuration in local storage.
   * If arguments is missing saves default configuration in local Storage.
   *
   * @param {Object} config {New configuration object}
   */
  store (config) {
    let data = null

    if (config) {
      data = JSON.stringify(config)
    } else {
      data = JSON.stringify(this._defaultConfiguration)
    }

    localStorage.setItem('configuration', data)
  },

  /**
   * Get current configuration
   * Returns current configuration from local storage.
   * If local storage is empty returns default configuration.
   *
   * @returns {Object} {Configuration object}
   */
  getCurrent () {
    let configuration = localStorage.getItem('configuration')

    if (configuration) {
      return JSON.parse(configuration)
    } else {
      this.store(this._defaultConfiguration)
      return this._defaultConfiguration
    }
  }
}
