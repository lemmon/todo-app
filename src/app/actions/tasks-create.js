const sanitizeName = require('../helpers/sanitize-name.js')

module.exports = (e, state, render) => {
  e.preventDefault()
  const form = e.target
  const name = sanitizeName(form.task.value)
  if (!name) {
    return
  }
  state.list.entries.push({ name })
  state.save()
  render()
}
