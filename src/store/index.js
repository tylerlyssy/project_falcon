import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import randomWords from 'random-words'

Vue.use(Vuex)

function make_name(_max) {
  let name = _.startCase(randomWords({ min: 1, max: _max || 5, join: ' ' }))
  return {
    display_name: name,
    name: name.replace(/ /g, '_').toLowerCase()
  }
}

let colors = [
  'red', 
  'pink', 
  'purple', 
  'deep-purple', 
  'indigo', 
  'blue', 
  'light-blue', 
  'cyan', 
  'teal',
  'green',
  'lightgreen',
  'amber',
  'orange',
  'deep-orange',
  'brown',
  'blue-grey',
]

let tags = _.map(colors, c => {
  return {
    ...make_name(),
    color: c,
    icon: ['tag-text', 'tag-heart'][_.random(0,1)]
  }
})

let tests = _.map([...Array(50).keys()], i => {
  let icons = ['language-python', 'cube-scan', 'account-edit']
  
  return {
    ...make_name(),
    icon: icons[_.random(0, 2)],
    tags: _.map(
      [...Array(_.random(0, 3)).keys()],
      (i) => tags[i]
    ),
    status: i % 2 === 0
  }
})

let devices = _.map([...Array(50).keys()], () => {
  let models = ["cybertruck", "model-s", "model-3", "model-x", "model-y"];

  let icons = [
    "cellphone-iphone",
    "cellphone-android",
    "tablet-ipad",
    "laptop",
    "raspberry-pi",
    "ipod",
    "router-wireless",
    "microsoft-xbox",
    "sony-playstation",
  ];
  return {
    ...make_name(),
    health: _.random(0, 10) % 2 == 0,
    actions: [
      {name: 'reboot', type: 'button'},
      {name: 'factory reset', type: 'button'},
      {name: 'firmware_upgrade', type: 'select'},
      {name: 'firmware_downgrade', type: 'select'},
      {name: 'enable_ssh', type: 'switch'}
    ],
    meta: {
      make: "tesla",
      model: models[_.random(0, 4)],
      version: `v${_.random(0, 23)}.${_.random(0, 54)}.${_.random(0, 59)}`
    },
    tags: _.map(
      [...Array(_.random(0, 3)).keys()],
      (i) => tags[i]
    ),
    icon: icons[_.random(0, 8)],
  };
});

function make_user() {
  let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let initials = letters[_.random(0, 25)] + letters[_.random(0, 25)] 
  return {
    user: {
      initials,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    }
  }
}

let plans = _.map([...Array(50).keys()], () => {
  let types = ['cron', 'event']
  let random = _.random(0, 40)
  return {
    ...make_name(),
    ...make_user(),
    tests: _.map(tests.slice(random, random + 5), t => {
      t.iterations = _.random(1, 10)
      t.is_selected = true
      return t
    }),
    triggers: _.map([...Array(3).keys()], j => {
      let t_type = types[_.random(0,1)]
      return {
        name: `trigger_${j}`,
        type: t_type,
        color: t_type === 'cron' ? 'primary' : 'secondary'
      }
    })
  }
})

let playlists = _.map([...Array(50).keys()], () => {
  let statuses = ['aborted', 'cancelled', 'passed', 'failed', 'queued', 'running']
  let random = _.random(0, 4)
  let status = ''
  if(random % 5 === 0) {
    status = 'running'
  } else if(random % 3 === 0) {
    status = 'queued'
  } else {
    status = 'finished'
  }
  let is_running = false
  let test_runs = _.flatten(_.map(plans[_.random(0, 49)].tests, test => {
    return _.map([...Array(test.iterations).keys()], () => {
      let t_status = ''
      if(status === 'running') {
        if(!is_running) {
          t_status = 'running'
          is_running = true
        } else {
          t_status = statuses[_.random(0, 4)]
        }
      } else if(status === 'queued') {
        t_status = statuses[4]
      } else {
        t_status = statuses[_.random(0, 3)]
      }
      return {
        test,
        status: t_status
      }
    })
  }))
  let count_map = _.countBy(test_runs, 'status')
  
  return {
    ...make_name(),
    ...make_user(),
    status_map: {
      'passed': count_map['passed'] || 0,
      'failed': count_map['failed'] || 0,
      'aborted': count_map['aborted'] || 0,
      'cancelled': count_map['cancelled'] || 0,
    },
    test_runs,
    status
  }
})

playlists = _.reverse(_.orderBy(playlists, 'status'))

let releases = _.map([...Array(50).keys()], () => {
  let stages = ['upgrade', 'smoke-test', 'int-test', 'sus-test', 'perf-test']
  let statuses = ['passed', 'failed', 'running']
  let random = _.random(1,4)
  let steps = _.map([...Array(_.random(1, 4)).keys()], (i) => {
    return {
      label: make_name().name,
      stage: stages[i],
      complete: i < random,
      status: statuses[i < random ? _.random(0, 1) : 2]
    }
  })
  let status = ''
  if(!_.every(steps, 'complete')) {
    status = statuses[2]
  } else if (_.every(steps, s => s.status === 'passed')) {
    status = statuses[0]
  } else {
    status = statuses[1]
  }
  return {
    ...make_name(2),
    version: `v${_.random(0, 5)}.${_.random(0, 5)}.${_.random(0, 5)}`,
    status,
    steps 
  }
})

export default new Vuex.Store({
  state: {
    tags_for_filtering: [],
    devices,
    tests,
    tags,
    plans,
    playlists,
    releases
  },
  getters: {
    tags_for_filtering(state) {
      return state.tags_for_filtering
    },
    devices(state) {
      return state.devices
    },
    tests(state) {
      return state.tests
    },
    tags(state) {
      return state.tags
    },
    plans(state) {
      return state.plans
    },
    playlists(state) {
      return state.playlists
    },
    releases(state) {
      return state.releases
    },
  },
  mutations: {
    set_tags_for_filtering(state, tags) {
      state.tags_for_filtering = tags
    }
  },
  actions: {
  },
  modules: {
  }
})
