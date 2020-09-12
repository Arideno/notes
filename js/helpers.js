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
  const div = document.createElement('div')
  if (note.isActive()) {
    li.classList.add('active')
  }
  div.appendChild(document.createTextNode(note.getTitle()))
  const date = document.createElement('time')
  date.appendChild(document.createTextNode(getFormattedDate(note.getDate())))
  div.appendChild(date)
  li.appendChild(div)
  return li
}

function UUID() {
  return '_' + Math.random().toString(36).substr(2, 9)
}
