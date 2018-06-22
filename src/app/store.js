module.exports.save = (state) => {
  fetch(location.href, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(state.list),
  })
}
