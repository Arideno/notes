import MyTemplateEngine from './templateEngine'

function text_truncate(str, length, ending) {
  if (length == null) {
    length = 100
  }
  if (ending === null) {
    ending = ''
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending
  } else {
    return str
  }
}

function htmlEncode(html) {
  return html.replace(/[&"'\<\>]/g, function (c) {
    switch (c) {
      case '&':
        return '&amp;'
      case "'":
        return '&#39;'
      case '"':
        return '&quot;'
      case '<':
        return '&lt;'
      default:
        return '&gt;'
    }
  })
}

function getFormattedDate(date) {
  let year = date.getFullYear()

  let month = (1 + date.getMonth()).toString()
  month = month.length > 1 ? month : '0' + month

  let day = date.getDate().toString()
  day = day.length > 1 ? day : '0' + day

  let hour = date.getHours().toString()
  hour = hour.length > 1 ? hour : '0' + hour

  let minutes = date.getMinutes().toString()
  minutes = minutes.length > 1 ? minutes : '0' + minutes

  let seconds = date.getSeconds().toString()
  seconds = seconds.length > 1 ? seconds : '0' + seconds

  return day + '.' + month + '.' + year + ' ' + hour + ':' + minutes + ':' + seconds
}

function createNoteLi(note) {
  const li = document.createElement('li')
  li.classList.add('sidebar__note')
  const div = document.createElement('div')
  if (note.isActive()) {
    li.classList.add('active')
  }
  let title = document.createElement('h2')
  let titleTemplate = MyTemplateEngine('{% this.title %}', {
    title: note.getTitle(),
  })
  title.appendChild(document.createTextNode(titleTemplate))
  div.appendChild(title)
  const creationDate = document.createElement('time')
  let creationDateTemplate = MyTemplateEngine('Creation date: {% this.date %}', {
    date: getFormattedDate(note.getDate()),
  })
  creationDate.appendChild(document.createTextNode(creationDateTemplate))
  div.appendChild(creationDate)
  const updateDate = document.createElement('time')
  let updateDateTemplate = MyTemplateEngine('Update date: {% this.date %}', {
    date: getFormattedDate(note.getUpdateDate()),
  })
  updateDate.appendChild(document.createTextNode(updateDateTemplate))
  div.appendChild(updateDate)
  li.appendChild(div)
  li.dataset.id = note.getID()
  return li
}

function UUID() {
  return '_' + Math.random().toString(36).substr(2, 9)
}

function insertParam(key, value) {
  window.history.replaceState(null, null, '?' + key + '=' + value)
}

function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, '')
  str = str.toLowerCase()

  var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;'
  var to = 'aaaaeeeeiiiioooouuuunc------'
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

  return str
}

export {
  getFormattedDate,
  createNoteLi,
  UUID,
  insertParam,
  htmlEncode,
  string_to_slug,
  text_truncate,
}