function getFormattedDate(date) {
  var year = date.getFullYear()

  var month = (1 + date.getMonth()).toString()
  month = month.length > 1 ? month : '0' + month

  var day = date.getDate().toString()
  day = day.length > 1 ? day : '0' + day

  return day + '.' + month + '.' + year
}

function createNoteLi(note) {
  const li = document.createElement('li')
  li.classList.add('sidebar__note')
  const div = document.createElement('div')
  if (note.isActive()) {
    li.classList.add('active')
  }
  div.appendChild(document.createTextNode(note.getTitle()))
  const date = document.createElement('time')
  date.appendChild(document.createTextNode(getFormattedDate(note.getDate())))
  div.appendChild(date)
  li.appendChild(div)
  li.dataset.id = note.getID()
  return li
}

function UUID() {
  return '_' + Math.random().toString(36).substr(2, 9)
}

function insertParam(key, value) {
  key = encodeURIComponent(key)
  value = encodeURIComponent(value)

  var kvp = document.location.search.substr(1).split('&')
  let i = 0

  for (; i < kvp.length; i++) {
    if (kvp[i].startsWith(key + '=')) {
      let pair = kvp[i].split('=')
      pair[1] = value
      kvp[i] = pair.join('=')
      break
    }
  }

  if (i >= kvp.length) {
    kvp[kvp.length] = [key, value].join('=')
  }

  let params = kvp.join('&')

  document.location.search = params
}

export { getFormattedDate, createNoteLi, UUID, insertParam }
