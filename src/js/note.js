import { UUID } from './helpers'

export default function Note(content) {
  this._content = content
  if (this._content === '') {
    this._title = 'New note'
  } else {
    this._title = this._content.split('\n')[0]
  }
  this._url = ''
  this._active = false
  this._date = new Date()
  this._id = UUID()
}

Note.prototype = {
  getID: function () {
    return this._id
  },

  getDate: function () {
    return new Date(this._date)
  },

  setActive: function () {
    this._active = true
  },

  setInactive: function () {
    this._active = false
  },

  isActive: function () {
    return this._active
  },

  getContent: function () {
    return this._content
  },

  getTitle: function () {
    return this._title
  },

  getUrlName: function () {
    return this._url
  },

  getTruncated: function () {
    if (this._content.length < 30) {
      return this._content
    } else {
      return this._content.substring(0, 29) + '...'
    }
  },
}