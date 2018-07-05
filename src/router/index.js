import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/pages/Main'
import InfoPage from '@/pages/Info'
import ConfigurationPage from '@/pages/Configuration'
import LogsPage from '@/pages/Logs'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: MainPage
  }, {
    path: '/info',
    component: InfoPage
  }, {
    path: '/configuration',
    component: ConfigurationPage
  }, {
    path: '/logs',
    component: LogsPage
  }]
})
