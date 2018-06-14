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
      <div class="">
        <div class="checkbox p05">
          <input
            type="checkbox"
            ${task.completed && `checked` || ``}
            onclick=${e => {
              const input = e.target
              task.completed = input.checked
              store.save()
              morph(input.closest('.row'), _renderTask(task, i))
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
      <div class="self-center">
        <div
          class="p05 cursor-pointer"
          href="#"
          onclick=${e => {
            e.preventDefault()
            state.list.entries.splice(i, 1)
            store.save()
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
