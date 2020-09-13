!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";function r(t){var e=document.createElement("li");e.classList.add("sidebar__note");var n=document.createElement("div");t.isActive()&&e.classList.add("active"),n.appendChild(document.createTextNode(t.getTitle()));var r=document.createElement("time");return r.appendChild(document.createTextNode(function(t){var e=t.getFullYear(),n=(1+t.getMonth()).toString();n=n.length>1?n:"0"+n;var r=t.getDate().toString();return(r=r.length>1?r:"0"+r)+"."+n+"."+e}(t.getDate()))),n.appendChild(r),e.appendChild(n),e.dataset.id=t.getID(),e}function o(t){this._content=t,""===this._content?this._title="New note":this._title=this._content.split("\n")[0],this._url="",this._active=!1,this._date=new Date,this._id="_"+Math.random().toString(36).substr(2,9)}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){c(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function c(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function u(t){return function(t){if(Array.isArray(t))return s(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return s(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return s(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}n.r(e),o.prototype={getID:function(){return this._id},getDate:function(){return new Date(this._date)},setActive:function(){this._active=!0},setInactive:function(){this._active=!1},isActive:function(){return this._active},getContent:function(){return this._content},setContent:function(t){this._content=t,""===this._content?this._title="New note":this._title=t.split("\n")[0]},getTitle:function(){return this._title},getUrlName:function(){return this._url}};var l=function(t){var e={},n=document.createElement("a");t=t||window.location.href,n.href=t;for(var r=n.search.substring(1).split("&"),o=0;o<r.length;o++){var i=r[o].split("=");e[i[0]]=decodeURIComponent(i[1])}return e},f=(n(0),n(1),document.getElementById("new_note")),d=document.getElementById("delete_note"),p=document.getElementById("sidebar__notes"),g=document.getElementById("note"),y=function(t,e){var n=t(e,{type:"__INIT__"}),r=[];return{dispatch:function(e){n=t(n,e),r.forEach((function(t){return t()}))},subscribe:function(t){r.push(t)},getState:function(){return n}}}((function(t,e){if("CREATE_NOTE"===e.type){var n=e.payload,r=u(t.notes);return r.push(n),a(a({},t),{},{note:n,notes:r})}if("DELETE_NOTE"===e.type){for(var o=e.payload,i=[],c=0;c<t.notes.length;c++)t.notes[c].getID()!==o.getID()&&i.push(t.notes[c]);return i.length>0?a(a({},t),{},{note:i[i.length-1],notes:i}):a(a({},t),{},{note:null,notes:i})}if("SELECT_NOTE"===e.type){var s=u(t.notes);return s.forEach((function(t){t.getID()!==e.payload.getID()?t.setInactive():t.setActive()})),a(a({},t),{},{note:e.payload,notes:s})}if("SET_NOTES"===e.type)return a(a({},t),{},{notes:e.payload});if("DESELECT_NOTE"===e.type){var l=u(t.notes);return l.forEach((function(e){e.getID()===t.note.getID()&&e.setInactive()})),a(a({},t),{},{note:null,notes:l})}if("CHANGE_CONTENT"===e.type){var f=u(t.notes);return f.forEach((function(n){n.getID()===t.note.getID()&&n.setContent(e.payload)})),a(a({},t),{},{notes:f})}return t}),{note:null,notes:[]});window.store=y;var h=l();function v(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];p.innerHTML="";var e=y.getState().notes;e.forEach((function(e){e.__proto__=o.prototype,t&&e.setInactive();var n=r(e);p.insertBefore(n,p.firstChild)}))}window.addEventListener("load",(function(){if(null===localStorage.getItem("notes"))localStorage.setItem("notes",JSON.stringify([]));else{var t=JSON.parse(localStorage.getItem("notes"));t.forEach((function(t){t.__proto__=o.prototype})),y.dispatch({type:"SET_NOTES",payload:t})}if(g.disabled=!0,h.id){var e=h.id,n=y.getState().notes;n&&n.forEach((function(t){t.__proto__=o.prototype,t.setInactive(),t.getID()===e&&(t.setActive(),y.dispatch({type:"SELECT_NOTE",payload:t}))}))}else v(!0)})),f.addEventListener("click",(function(){var t=new o("");y.getState().note&&y.dispatch({type:"DESELECT_NOTE"}),y.dispatch({type:"CREATE_NOTE",payload:t})})),d.addEventListener("click",(function(){y.getState().note&&y.dispatch({type:"DELETE_NOTE",payload:y.getState().note})})),window.addEventListener("click",(function(t){if(t.target.classList.contains("sidebar__note")){for(var e=t.target.dataset.id,n=y.getState().notes,r=0;r<n.length;r++)if(n[r].getID()===e){y.dispatch({type:"SELECT_NOTE",payload:n[r]});break}v(!1)}})),g.oninput=function(t){var e=t.target.value;y.dispatch({type:"CHANGE_CONTENT",payload:e})},y.subscribe((function(){var t,e,n=y.getState();localStorage.setItem("notes",JSON.stringify(n.notes)),n.note?(n.note.setActive(),g.disabled=!1,g.value=n.note.getContent(),h.id!==n.note.getID()&&(t="id",e=n.note.getID(),window.history.replaceState(null,null,"?"+t+"="+e))):g.disabled=!0,v(!1)}))}]);