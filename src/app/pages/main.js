const html = require('nanohtml')
const morph = require('nanomorph')

const createTask = require('../actions/tasks-create')
const sanitizeName = require('../helpers/sanitize-name')

const _renderTitle = require('../partials/title.js')
const _renderTask = require('../partials/task.js')

module.exports = (state, render) => {
  return html`
    <body>

      <div>
        <div class="max48 mx">
          ${_renderTitle(state, render)}
          <div>
            <form
              onsubmit=${e => createTask(e, state, render)}
              novalidate
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
              ${state.list.entries.map((task, index) => _renderTask(task, index, state, render))}
            </div>
          ` || ``}
        </div>
      </div>

    </body>
  `
}
