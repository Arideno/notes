import { createNoteLi, UUID, insertParam } from './helpers.js'
import Note from './note.js'
import createStore from './createStore.js'
import rootReducer from './redux/rootReducer.js'
import getParams from './router.js'
import '../css/normalize.css'
import '../css/styles.css'

const createNoteButton = document.getElementById('new_note')
const deleteNoteButton = document.getElementById('delete_note')
const notesList = document.getElementById('sidebar__notes')

const store = createStore(rootReducer, {
  createNewNote: false,
  deleteNote: false,
  note: null,
})

window.store = store

// Get params
let params = getParams()

// Refresh sidebar
function refreshSidebar(allInactive = false) {
  notesList.innerHTML = ''
  const notes = JSON.parse(localStorage.getItem('notes'))
  notes.forEach((note) => {
    note.__proto__ = Note.prototype
    if (allInactive) {
      note.setInactive()
    }
    const li = createNoteLi(note)
    notesList.insertBefore(li, notesList.firstChild)
  })
}

window.addEventListener('load', () => {
  if (localStorage.getItem('notes') === null) {
    localStorage.setItem('notes', JSON.stringify([]))
  }

  if (params['id']) {
    const id = params['id']
    let notes = localStorage.getItem('notes')
    if (notes) {
      notes = JSON.parse(notes)
      notes.forEach((note) => {
        note.__proto__ = Note.prototype
        note.setInactive()
        if (note.getID() === id) {
          note.setActive()
          store.dispatch({ type: 'SELECT_NOTE', payload: note })
        }
      })
      localStorage.setItem('notes', JSON.stringify(notes))
      refreshSidebar(false)
    }
  } else {
    refreshSidebar(true)
  }
})

createNoteButton.addEventListener('click', () => {
  store.dispatch({ type: 'CREATE_NOTE' })
})

deleteNoteButton.addEventListener('click', () => {
  store.dispatch({ type: 'DELETE_NOTE' })
})

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('sidebar__note')) {
    const noteID = event.target.dataset.id
    insertParam('id', noteID)
  }
})

// On creation
store.subscribe(() => {
  const state = store.getState()

  if (state.createNewNote) {
    const note = new Note('')
    store.dispatch({ type: 'SELECT_NOTE', payload: note })
    const notes = JSON.parse(localStorage.getItem('notes'))
    if (notes) {
      notes.forEach((note) => {
        note.__proto__ = Note.prototype
        note.setInactive()
      })
      localStorage.setItem('notes', JSON.stringify(notes.concat(note)))
    } else {
      localStorage.setItem('notes', JSON.stringify([note]))
    }
    refreshSidebar()
  }
})

// On deletion
store.subscribe(() => {
  const state = store.getState()

  if (state.deleteNote) {
    if (state.note) {
      let notes = JSON.parse(
        localStorage.getItem('notes') !== null
          ? localStorage.getItem('notes')
          : []
      )
      for (let i = 0; i < notes.length; i++) {
        const note = notes[i]
        note.__proto__ = Note.prototype
        if (note.getID() === state.note.getID()) {
          notes.splice(i, 1)
          break
        }
      }
      localStorage.setItem('notes', JSON.stringify(notes))
      if (notes.length === 0) {
        store.dispatch({
          type: 'SELECT_NOTE',
          payload: null,
        })
      } else {
        store.dispatch({
          type: 'SELECT_NOTE',
          payload: notes[notes.length - 1],
        })
      }
      refreshSidebar(false)
    }
  }
})

// On note select
store.subscribe(() => {
  const state = store.getState()

  if (state.note) {
    state.note.setActive()
    const notes = JSON.parse(localStorage.getItem('notes'))

    for (let i = 0; i < notes.length; i++) {
      const note = notes[i]
      note.__proto__ = Note.prototype
      if (note.getID() === state.note.getID()) {
        note.setActive()
        break
      }
    }

    localStorage.setItem('notes', JSON.stringify(notes))
    refreshSidebar()
  }
})
