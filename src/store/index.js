import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import randomWords from 'random-words'

Vue.use(Vuex)
Date.prototype.minus_days = function(days, mins) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() - days);
  date.setTime(date.getTime() - mins);
  return date;
}

function make_name(_max) {
  let name = _.startCase(randomWords({ min: 1, max: _max || 5, join: ' ' }))
  return {
    display_name: name,
    name: name.replace(/ /g, '_').toLowerCase()
  }
}

function make_dates(additions) {
  let dates = {
    created_at: new Date().minus_days(_.random(1, 1000), _.random(100000, 100000000)),
    updated_at: new Date().minus_days(_.random(1, 1000), _.random(100000, 100000000)),
  }
  for(let addition of additions || []) {
    dates[addition] = new Date().minus_days(_.random(1, 1000), _.random(100000, 100000000))
  }
  return dates
}

let colors = [
  '#F44336', 
  '#E91E63', 
  '#9C27B0', 
  '#673AB7', 
  '#3F51B5', 
  '#2196F3', 
  '#03A9F4', 
  '#00BCD4', 
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#795548',
  '#607D8B',
]

let tags = _.map(colors, c => {
  return {
    ...make_name(2),
    ...make_dates(),
    color: c,
    icon: ['tag-text', 'tag-heart'][_.random(0,1)]
  }
})

let tests = _.map([...Array(50).keys()], i => {
  let icons = ['language-python', 'cube-scan', 'account-edit']
  
  return {
    ...make_name(),
    ...make_dates(),
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
    ...make_dates(),
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

let events = _.map([...Array(50).keys()], (i) => {
  let days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  let colors = ['success', 'error', 'warning', 'accent']
  let {name} = make_name(1)
  if(i % _.random(2, 5) === 0) {
    name = `every_${days[_.random(0, 6)]}_at_${_.random(1, 23)}REPLACE${_.random(0, 6)}${_.random(0, 6)}`
  } else {
    name = `new_${name}_version`
  }
  let event = {
    ...make_dates(),
    name: name.replace('REPLACE', ':'),
    display_name: _.startCase(name).replace('REPLACE', ':'),
    color: _.startsWith(name, 'every') ? 'primary' : colors[_.random(0, 3)]
  }
  if(_.startsWith(name, 'every')) {
    event.next_run_time = new Date().minus_days(_.random(1, 10), _.random(1000000, 100000000))
  } else {
    event.last_run_time = new Date().minus_days(_.random(1, 10), _.random(1000000, 100000000))
  }
  return event
})


let plans = _.map([...Array(50).keys()], () => {
  
  let random = _.random(0, 40)
  return {
    ...make_name(),
    ...make_user(),
    ...make_dates(),
    tests: _.map(tests.slice(random, random + 5), t => {
      t.iterations = _.random(1, 10)
      t.is_selected = true
      return t
    }),
    events: random % 2 ? [events[_.random(0, 49)]] : []
  }
})

let playlists = _.map([...Array(50).keys()], () => {
  let statuses = ['aborted', 'cancelled', 'passed', 'failed', 'queued', 'running']
  let random = _.random(0, 4)
  let status = ''
  let additions = []
  if(random % 5 === 0) {
    status = 'running'
    additions = ['started_at']
  } else if(random % 3 === 0) {
    status = 'queued'
  } else {
    status = 'finished'
    additions = ['started_at', 'ended_at']
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
    ...make_dates(additions),
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
      ...make_dates(),
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
    releases,
    events,
    search: ''
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
    events(state) {
      return state.events
    },
    search(state) {
      return state.search
    }
  },
  mutations: {
    set_tags_for_filtering(state, tags) {
      state.tags_for_filtering = tags
    },
    set_search(state, search) {
      state.search = search
    }
  },
  actions: {
  },
  modules: {
  }
})
