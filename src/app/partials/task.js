const html = require('nanohtml')
const morph = require('nanomorph')

const sanitizeName = require('../helpers/sanitize-name')

const _renderTask = (task, index, state, render) => html`
  <div class="row p05 bb b-black-10">
    <div class="">
      <div class="checkbox p05">
        <input
          type="checkbox"
          ${task.completed && `checked` || ``}
          onclick=${e => {
            const input = e.target
            task.completed = input.checked
            state.save()
            morph(input.closest('.row'), _renderTask(task, index, state, render))
          }}
        />
        <svg class="image" width="16" height="16" viewBox="0 0 16 16">
          <rect x=2 y=2 width=12 height=12 rx=2 ry=2 stroke=black fill=transparent />
          <rect class="checkbox-checked" x=4 y=4 width=8 height=8 rx=1 ry=1 />
        </svg>
      </div>
    </div>
    <div class="span1">
      <div
        class="p05 ${task.completed && `st` || ``}"
        ondblclick=${e => {
          e.preventDefault()
          morph(e.target, html`
            <div>
              <form
                onsubmit=${e => {
                  e.preventDefault()
                  const form = e.target
                  const name = sanitizeName(form.task.value)
                  if (!name) {
                    render()
                    return
                  }
                  task.name = name
                  state.save()
                  render()
                }}
              >
                <input
                  class="input p05"
                  type="text"
                  name="task"
                  value=${task.name}
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
      >${task.name}</div>
    </div>
    <div class="self-center">
      <div
        class="p05 cursor-pointer"
        href="#"
        onclick=${e => {
          e.preventDefault()
          state.list.entries.splice(index, 1)
          state.save()
          render()
        }}
      >
        <svg class="image" width="16" height="16" viewBox="0 0 16 16">
          <line x1=4 y1=4 x2=12 y2=12 stroke=black />
          <line x1=4 y2=4 x2=12 y1=12 stroke=black />
        </svg>
      </div>
    </div>
  </div>
`

module.exports = _renderTask
