const state = require('./state')

module.exports.save = () => {
  fetch(location.href, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(state.list.entries),
  })
}
