import { createNoteLi, UUID, insertParam, htmlEncode } from './helpers.js'
import Note from './note.js'
import createStore from './createStore.js'
import rootReducer from './redux/rootReducer.js'
import getParams from './router.js'
import MyTemplateEngine from './templateEngine'
import '../css/normalize.css'
import '../css/styles.css'

const createNoteButton = document.getElementById('new_note')
const deleteNoteButton = document.getElementById('delete_note')
const notesList = document.getElementById('sidebar__notes')
const textarea = document.getElementById('note')

const store = createStore(rootReducer, {
  created: false,
  note: null,
  notes: [],
})

window.store = store

// Get params
let params = getParams()

// Refresh sidebar
function refreshSidebar(allInactive = false) {
  notesList.innerHTML = ''
  const notes = store.getState().notes
  notes.forEach((note) => {
    note.__proto__ = Note.prototype
    if (allInactive) {
      note.setInactive()
    }
    const li = createNoteLi(note)
    if (store.getState().created) {
      if (note.getID() === store.getState().note.getID()) {
        li.classList.add('animate_add')
      }
    }
    notesList.insertBefore(li, notesList.firstChild)
  })
}

window.addEventListener('load', () => {
  if (localStorage.getItem('notes') === null) {
    localStorage.setItem('notes', JSON.stringify([]))
  } else {
    let notes = JSON.parse(localStorage.getItem('notes'))
    notes.forEach((note) => {
      note.__proto__ = Note.prototype
    })
    store.dispatch({ type: 'SET_NOTES', payload: notes })
  }

  textarea.disabled = true

  if (params['id']) {
    const id = params['id']
    let notes = store.getState().notes
    if (notes) {
      notes.forEach((note) => {
        note.__proto__ = Note.prototype
        note.setInactive()
        if (note.getUrlName() === id) {
          note.setActive()
          store.dispatch({ type: 'SELECT_NOTE', payload: note })
        }
      })
    }
  } else {
    refreshSidebar(true)
  }
})

createNoteButton.addEventListener('click', () => {
  const note = new Note('')
  if (store.getState().note) {
    store.dispatch({ type: 'DESELECT_NOTE' })
  }
  store.dispatch({ type: 'CREATE_NOTE', payload: note })
})

deleteNoteButton.addEventListener('click', () => {
  if (store.getState().note) {
    const sidebar_notes = document.getElementsByClassName('sidebar__note')
    Array.prototype.forEach.call(sidebar_notes, (noteLi) => {
      if (noteLi.dataset.id === store.getState().note.getID()) {
        noteLi.classList.add('animate_delete')
      }
    })
    setTimeout(() => {
      store.dispatch({ type: 'DELETE_NOTE', payload: store.getState().note })
    }, 1000)
  }
})

window.addEventListener('click', (event) => {
  if (
    event.target.classList.contains('sidebar__note') ||
    event.target.nodeName == 'H2' ||
    event.target.nodeName == 'TIME'
  ) {
    const noteID =
      event.target.dataset.id || event.target.parentNode.parentNode.dataset.id
    const notes = store.getState().notes
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].getID() === noteID) {
        store.dispatch({ type: 'SELECT_NOTE', payload: notes[i] })
        break
      }
    }
    refreshSidebar(false)
  }
})

textarea.oninput = function (event) {
  const content = event.target.value

  store.dispatch({ type: 'CHANGE_CONTENT', payload: content })
}

store.subscribe(() => {
  const state = store.getState()
  localStorage.setItem('notes', JSON.stringify(state.notes))
  if (state.note) {
    state.note.setActive()
    textarea.disabled = false
    let contentTemplate = MyTemplateEngine('{% this.content %}', {
      content: state.note.getContent(),
    })
    textarea.value = contentTemplate
    if (params['id'] !== state.note.getUrlName()) {
      insertParam('id', state.note.getUrlName())
    }
  } else {
    textarea.value = ''
    textarea.disabled = true
  }
  refreshSidebar(false)
})
