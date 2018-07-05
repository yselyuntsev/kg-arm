export default {
  _defaultLog: [],

  _checkLogs () {
    return JSON.parse(localStorage.getItem('logs'))
  },

  _log (trace) {
    let logs = this._checkLogs()

    if (!logs) {
      logs = this._defaultLog
    }

    if (logs.length > 49) {
      logs.length = 49
    }

    logs.unshift(trace)

    localStorage.setItem('logs', JSON.stringify(logs))
  },

  _createLog (type, title, data) {
    return {
      date: new Date().toLocaleString(),
      type,
      title,
      data
    }
  },

  clear () {
    localStorage.removeItem('logs')
  },

  getLogs () {
    return this._checkLogs() || this._defaultLog
  },

  event (title, data) {
    this._log(this._createLog('event', title, data))
  },

  person (title, data) {
    this._log(this._createLog('person', title, data))
  },

  system (title, data) {
    this._log(this._createLog('system', title, data))
  },

  error (title, data) {
    this._log(this._createLog('error', title, data))
  }
}
