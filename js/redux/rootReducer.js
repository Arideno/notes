function rootReducer(state, action) {
  if (action.type === 'CREATE_NOTE') {
    return { ...state, createNewNote: true }
  } else if (action.type === 'DELETE_NOTE') {
    return { ...state, deleteNote: true }
  } else if (action.type === 'SELECT_NOTE') {
    return {
      ...state,
      createNewNote: false,
      deleteNote: false,
      note: action.payload,
    }
  }
  return state
}
