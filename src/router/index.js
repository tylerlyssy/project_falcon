import Vue from 'vue'
import VueRouter from 'vue-router'
import constants from '../consts'

Vue.use(VueRouter)

const routes = [
  ...constants.pages, 
  ...constants.user_pages,
  ...constants.detail_pages,
  ...constants.other_pages
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
