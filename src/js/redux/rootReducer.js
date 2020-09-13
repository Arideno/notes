export default function rootReducer(state, action) {
  if (action.type === 'CREATE_NOTE') {
    let note = action.payload
    let notes = [...state.notes]
    notes.push(note)
    return { ...state, note, notes }
  } else if (action.type === 'DELETE_NOTE') {
    let note = action.payload
    let notes = []
    for (let i = 0; i < state.notes.length; i++) {
      if (state.notes[i].getID() !== note.getID()) {
        notes.push(state.notes[i])
      }
    }
    if (notes.length > 0) {
      return { ...state, note: notes[notes.length - 1], notes }
    } else {
      return { ...state, note: null, notes }
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
    return { ...state, note: action.payload, notes }
  } else if (action.type === 'SET_NOTES') {
    return {
      ...state,
      notes: action.payload,
    }
  } else if (action.type === 'DESELECT_NOTE') {
    const notes = [...state.notes]
    notes.forEach((note) => {
      if (note.getID() === state.note.getID()) {
        note.setInactive()
      }
    })
    return { ...state, note: null, notes }
  } else if (action.type === 'CHANGE_CONTENT') {
    const notes = [...state.notes]
    notes.forEach((note) => {
      if (note.getID() === state.note.getID()) {
        note.setContent(action.payload)
      }
    })
    return {
      ...state,
      notes,
    }
  }
  return state
}
