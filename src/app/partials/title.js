const html = require('nanohtml')
const morph = require('nanomorph')

const sanitizeName = require('../helpers/sanitize-name')

module.exports = (state, render) => html`
  <div class="h2 lh2 fw900">
    <div
      class="p1"
      ondblclick=${e => {
        e.preventDefault()
        morph(e.target, html`
          <div>
            <form
              onsubmit=${e => {
                e.preventDefault()
                const form = e.target
                const name = sanitizeName(form.name.value)
                if (!name) {
                  render()
                  return
                }
                state.list.name = name
                state.save()
                render()
              }}
            >
              <input
                class="input p1"
                type="text"
                name="name"
                value=${state.list.name}
                onblur=${e => {
                  render()
                }}
              />
            </form>
          </div>
        `)
        const input = e.target.querySelector('input')
        input.select()
        input.focus()
      }}
    >${state.list.name || `untitled list`}</div>
  </div>
`
