import Vue from 'vue'
import app from './app.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import constants from './consts.js'

Vue.config.productionTip = false
Vue.use(constants)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(app)
}).$mount('#app')



