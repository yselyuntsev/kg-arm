import Axios from 'axios'
import Configuration from './ConfigurationService'
import Router from '@/router/index'

const CONFIG = Configuration.getCurrent()

Axios.interceptors.response.use(response => (response), error => {
  if (error.response.status === 401) {
    Router.push('/login')
  } else {
    return Promise.reject(error)
  }
})

Axios.defaults.headers.common['Authorization'] = CONFIG.token

const API = Axios.create({
  baseURL: `${CONFIG.origin + CONFIG.apiUrl}`
})

export default {
  check () {
    let token = sessionStorage.getItem('authorization-token')

    if (token) {
      Axios.defaults.headers.common['Authorization'] = token
      if (location.href.split(location.origin)[1] === '/login') {
        Router.push('/')
      }
    } else {
      Router.push('/login')
    }
  },

  /**
   * Check server status
   * Return promise with server status
   * @returns {Promise}
   */
  status () {
    return API.get('/status')
  },

  /**
   * Authentication user
   * Send password and username to server. If data valid, returns secret token.
   * @param {String} username Administration username
   * @param {String} password Administration password
   * @returns {Boolean}
   */
  auth (username, password) {
    return API.post('/admin/users/authenticate', {username, password})
  },

  /**
   * Logout from system
   * Delete user session from session Storage
   */
  logout () {
    sessionStorage.removeItem('authorization-token')
    sessionStorage.removeItem('username')
    Axios.defaults.headers.common['Authorization'] = ''
    Router.push('/login')
  },

  /**
   * ==============================
   * Units Api methods
   * ==============================
   */

  /**
   * Get root Units
   * GET /api/v1/units
   * Returns promise with all root units (units without parent_id).
   * @return {Promise}
   */
  getRootUnits () {
    return API.get('/units')
  },

  /**
   * Get Unit by ID
   * GET /api/v1/units/:unit_id
   * The method for get unit by id. After successful response will be returned promise with an unit.
   * If some fields are invalid, then returns validation errors.
   * @param {Object} id Request doesn't require any params.
   * @return {Promise}
   */
  getUnit (id) {
    return API.get(`/units/${id}`)
  },

  /**
   * Create an Unit
   * POST /api/v1/units
   * The method for unit creating. After successful creation will be returned promise with an created unit.
   * If some fields are invalid, then returns validation errors.
   * @param {Object} unit {"name": "Name", "parent_id": 1}
   * @return {Promise}
   */
  createUnit (unit) {
    return API.post('/units', unit)
  },

  /**
   * Update an Unit
   * PUT /api/v1/units
   * The method for unit updating. After successful updation will be returned promise with an updated unit.
   * If some fields are invalid, then returns validation errors.
   * @param {Object} unit {"name": "Name", "parent_id": 1}
   * @return {Promise}
   */
  updateUnit (unit) {
    return API.put(`/units/${unit.id}`, unit)
  },

  /**
   * Delete an Unit
   * DELETE /api/v1/units/:unit_id
   * The method for units deletion.
   * If unit with given id not found, then returns validation errors.
   * @param {Number} id Request doesn't require any params.
   * @return {Promise}
   */
  deleteUnit (id) {
    return API.delete(`/units/${id}`)
  },

  /**
   * ==============================
   * Keys Api methods
   * ==============================
   */

  /**
   * Get all Keys
   * GET /api/v1/keys
   * Returns promise with all keys.
   * @return {Promise}
   */
  getKeys () {
    return API.get('/keys')
  },

  /**
   * Get a key by id
   * GET /api/v1/keys/:key_id
   * Return a key with given id. If some fields are invalid, then returns validation errors.
   * @param {string} id {super-unique-id-key}
   * @return {Promise}
   */
  getKeyById (id) {
    return API.get(`/keys/${id}`)
  },

  /**
   * Get all Taken keys
   * GET /api/v1/keys/taken
   * Return promise with all taken keys.
   * @return {Promise}
   */
  getTakenKeys () {
    return API.get('/keys/taken')
  },

  /**
   * Get all employee taken Keys
   * GET /api/v1/keys/taken
   * Return promise with all employee taken keys.
   * @param {Number} employeeID
   * @return {Promise}
   */
  getEmployeeTakenKeys (employeeID) {
    return API.get(`/keys/taken/${employeeID}`)
  },

  /**
   * Create a key
   * POST /api/v1/keys
   * The method for keys creating. After successful creation will be returned promise with a created key. If some fields are invalid, then returns validation errors.
   * @param {Object} key {"id": "super-unique-key-id", "name": "Key #6", "color": "red", "extra": "key for room #6"}
   * @return {Promise}
   */
  createKey (key) {
    return API.post('/keys', key)
  },

  /**
   * Update a key
   * PUT /api/v1/keys/:key_id
   * The method for keys updating. After successful updation will be returned promise with a updated key. If some fields are invalid, then returns validation errors.
   * @param {Object} name {"name", "color", "extra"}
   * @return {Promise}
   */
  updateKey (key) {
    return API.put(`/keys/${key.id}`, key)
  },

  /**
   * Delete a key
   * DELETE /api/v1/keys/:key_id
   * The method for keys deletion. Return empty promise.
   * @param {string} id {super-unique-id-key}
   * @return {Promise}
   */
  deleteKey (id) {
    return API.delete(`/keys/${id}`)
  },

  /**
   * Add a key to unit
   * POST /api/v1/keys/:key_id/unit/:unit_id
   * Adds given key to given unit. Return empty promise.
   * @param {string} keyID {super-unique-id-key}
   * @param {string} unitID {super-unique-id-unit}
   * @return {Promise}
   */
  addKeyToUnit (keyID, unitID) {
    return API.post(`/keys/${keyID}/unit/${unitID}`, {})
  },

  /**
   * Remove a key from unit
   * DELETE /api/v1/keys/:key_id/unit/:unit_id
   * Removes given key from given unit. Return empty promise.
   * @param {string} keyID {super-unique-id-key}
   * @param {string} unitID {super-unique-id-unit}
   * @return {Promise}
   */
  removeKeyFromUnit (keyID, unitID) {
    return API.delete(`/keys/${keyID}/unit/${unitID}`)
  },

  /**
   * Take/return a key
   * POST /api/v1/keys/:key_id/take-or-return/:employee_id
   * Take or return a key.
   * @param {string} keyID {super-unique-id-key}
   * @param {string} employeeID {super-unique-id-employee}
   * @return {Promise}
   */
  takeOrReturnKey (keyID, employeeID) {
    return API.post(`/keys/${keyID}/take-or-return/${employeeID}`, {})
  },

  getEmployees () {
    return API.get('/employees')
  },

  /**
   * ==============================
   * Employees Api methods
   * ==============================
   */

  /**
   * Get Employee by card id
   * GET /api/v1/employee/:card_id
   * Retunr promise with employee by card id.
   * @param {String} cardId {card_id}
   * @return {Promise}
   */
  getEmployeeByCardId (cardId) {
    return API.get(`/employees/${cardId}`)
  },

  /**
   * Creater an Employee
   * POST /api/v1/employees
   * The method for employee creating. After successful creation will be returned promise with an created employee.
   * If some fields are invalid, then returns validation errors.
   * @param {Object} employee {"first_name": "Bruce", "last_name": "Wayne", "patronym": "Batman", "card": "super-unique-card-id", "encoded_photo": "data:image/png;base64,iVBO...", "unit_ids": [1, 2]}
   * @return {Promise}
   */
  createEmployee (employee) {
    return API.post('/employees', employee)
  },

  /**
   * Update an Employee
   * PUT /api/v1/employees
   * The method for employee updating. After successful updation will be returned promise with an updated employee.
   * If some fields are invalid, then returns validation errors.
   * @param {Object} employee {"first_name": "Bruce", "last_name": "Wayne", "patronym": "Batman", "card": "super-unique-card-id", "encoded_photo": "data:image/png;base64,iVBO...", "unit_ids": [1, 2]}
   * @return {Promise}
   */
  updateEmployee (employee) {
    return API.put(`/employees/${employee.id}`, employee)
  },

  /**
   * Delete an Employee
   * DELETE /api/v1/employees/:employee_id
   * The method for employee deletion.
   * @param {Number} employeeID {323}
   * @return {Promise}
   */
  deleteEmployee (employeeID) {
    return API.delete(`/employees/${employeeID}`)
  },

  /**
   * ==============================
   * KeyAccess Api methods
   * ==============================
   */

  /**
   * Get employee KeyAccess
   * GET /api/v1/key-access/:employee_id
   * Return promise with all employee KeyAccess
   * @param {Number} employeeID {3242343}
   * @return {Promise}
   */
  getEmployeeKeyAccess (employeeID) {
    return API.get(`/key-access/${employeeID}`)
  },

  /**
   * Create a key access
   * POST /api/v1/key-access
   * The method for key access creating. After successful creation will be returned promise with a created key access.
   * If some fields are invalid, then returns validation errors.
   * @param {Object} keyAccess {"key_id": "super-unique-key-id", "employee_id": 1, "access_type": "false"}
   * @return {Promise}
   */
  createKeyAccess (keyAccess) {
    return API.post(`/key-access`, keyAccess)
  },

  /**
   * Update a key access
   * PUT /api/v1/key-access/:key_access_id
   * The method for key access updating. After successful updation will be returned promise with a updated key access.
   * If some fields are invalid, then returns validation errors.
   * @param {Object} keyAccess {"key_access": "true"}
   * @return {Promise}
   */
  updateKeyAccess (keyAccess) {
    return API.put(`/key-access/${keyAccess.id}`, {access_type: keyAccess.access_type})
  },

  /**
   * Delete a key access
   * DELETE /api/v1/key-access/:key_access_id
   * Delete a key access
   * @param {Number} keyAccessID Request doesn't require any params.
   * @return {Promise}
   */
  deleteKeyAccess (keyAccessID) {
    return API.delete(`/key-access/${keyAccessID}`)
  }
}
