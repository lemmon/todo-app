const morph = require('nanomorph')
const state = require('./state')
const store = require('./store')
const _render = require('./pages/main')

// store
state.save = () => {
  store.save(state)
}

// render emitter
function render() {
  // morph dom
  morph(document.body, _render(state, render))
  // update title
  document.title = state.list.name
}

// run
render()
