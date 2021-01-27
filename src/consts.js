import device_list from './views/device_list'
import device_detail from './views/device_detail'
import test_list from './views/test_list'
import test_detail from './views/test_detail'
import playlist_list from './views/playlist_list'
import playlist_detail from './views/playlist_detail'
import plan_list from './views/plan_list'
import plan_detail from './views/plan_detail'
import tag_list from './views/tag_list'
import tag_detail from './views/tag_detail'
import release_list from './views/release_list'
import event_list from './views/event_list'
import settings from './views/settings'
import user from './views/user'
import status from './views/status'
import home from './views/home'

import _ from 'lodash'

let constants = {
  pages: [
    {path: '/devices', name: 'device_list', icon: 'devices', component: device_list},
    {path: '/tests', name: 'test_list', icon: 'script-outline', component: test_list},
    {path: '/plans', name: 'plan_list', icon: 'chart-sankey-variant', component: plan_list},
    {path: '/playlists', name: 'playlist_list', icon: 'list-status', component: playlist_list},
    {path: '/releases', name: 'release_list', icon: 'chart-timeline', component: release_list},
    {path: '/tags', name: 'tag_list', icon: 'tag-multiple', component: tag_list},
    {path: '/events', name: 'event_list', icon: 'timeline-alert', component: event_list},
  ],
  user_pages: [
    {path: '/settings', name: 'settings', icon: 'cog', component: settings},
    {path: '/status', name: 'status', icon: 'heart-pulse', component: status},
    {path: '/user', name: 'user', icon: 'account', component: user},
  ],
  detail_pages: [
    {path: '/devices/:name', name: 'device_detail', component: device_detail, props: true},
    {path: '/tests/:name', name: 'test_detail', component: test_detail, props: true},
    {path: '/plans/:name', name: 'plan_detail', component: plan_detail, props: true},
    {path: '/tags/:name', name: 'tag_detail', component: tag_detail, props: true},
    {path: '/playlists/:name', name: 'playlist_detail', component: playlist_detail, props: true},
  ],
  other_pages: [
    {path: '/', name: 'home', component: home, props: true},
  ]
}
import {mapGetters, mapMutations} from 'vuex'

export default {
  install: (app) => {
    app.prototype.$constants = constants
    app.prototype.$_ = _
    app.$map_getters = mapGetters
    app.$map_mutations = mapMutations
  },
  ...constants
}