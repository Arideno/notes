export default function rootReducer(state, action) {
  if (action.type === 'CREATE_NOTE') {
    let note = action.payload
    let notes = [...state.notes]
    notes.push(note)
    return {
      ...state,
      note,
      notes,
      created: true
    }
  } else if (action.type === 'DELETE_NOTE') {
    let note = action.payload
    let notes = []
    let index = 0
    for (let i = 0; i < state.notes.length; i++) {
      if (state.notes[i].getID() !== note.getID()) {
        notes.push(state.notes[i])
      } else {
        index = i
      }
    }
    if (notes.length > 0) {
      return {
        ...state,
        note: index - 1 >= 0 ? notes[index - 1] : notes[0],
        notes,
        created: false,
      }
    } else {
      return {
        ...state,
        note: null,
        notes,
        created: false
      }
    }
  } else if (action.type === 'SELECT_NOTE') {
    const notes = [...state.notes]
    notes.forEach((note) => {
      if (note.getID() !== action.payload.getID()) {
        note.setInactive()
      } else {
        note.setActive()
      }
    })
    return {
      ...state,
      note: action.payload,
      notes,
      created: false
    }
  } else if (action.type === 'SET_NOTES') {
    return {
      ...state,
      notes: action.payload,
      created: false,
    }
  } else if (action.type === 'DESELECT_NOTE') {
    const notes = [...state.notes]
    notes.forEach((note) => {
      if (note.getID() === state.note.getID()) {
        note.setInactive()
      }
    })
    return {
      ...state,
      note: null,
      notes,
      created: false
    }
  } else if (action.type === 'CHANGE_CONTENT') {
    const notes = [...state.notes]
    notes.forEach((note) => {
      if (note.getID() === state.note.getID()) {
        note.setContent(action.payload)
        note.setUpdateDate(Date.now())
      }
    })
    return {
      ...state,
      notes,
      created: false,
    }
  }
  return state
}