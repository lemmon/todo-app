const html = require('nanohtml');
const morph = require('nanomorph');

const state = require('./state')
const store = require('./store')

function render() {
  morph(document.body, _render())
}

function _render() {
  return html`
    <body class="col justify-center">

      <div>
        <div class="max48 mx">
          <div>
            <form
              onsubmit=${createTask}
            >
              <input
                class="input ba b-black-10 p1"
                type="text"
                name="task"
                placeholder="${state.list.entries.length && `Add another task\u2026` || `Start here\u2026`}"
              />
            </form>
          </div>
          ${state.list.entries.length && html`
            <div>
              ${state.list.entries.map(_renderTask)}
            </div>
          ` || ``}
        </div>
      </div>

    </body>
  `
}

function _renderTask(task, i) {
  return html`
    <div class="row p05 bb b-black-10">
      <div class="p05">
        <input
          type="checkbox"
          ${task.completed && `checked` || ``}
          onclick=${e => {
            const input = e.target
            task.completed = input.checked
            store.save()
          }}
        />
      </div>
      <div class="span1">
        <div
          class="p05"
          ondblclick=${e => {
            e.preventDefault()
            morph(e.target, html`
              <div>
                <form
                  onsubmit=${e => {
                    e.preventDefault()
                    const form = e.target
                    const name = form.task.value
                    task.name = name
                    store.save()
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
      <div class="p05">
        <a
          href="#"
          onclick=${e => {
            e.preventDefault()
            state.list.entries.splice(i, 1)
            store.save()
            render()
          }}
        >x</a>
      </div>
    </div>
  `
}

function createTask(e) {
  e.preventDefault()
  const form = e.target
  const name = form.task.value
  if (!name) {
    return
  }
  state.list.entries.push({ name })
  render()
  store.save()
}

render()
