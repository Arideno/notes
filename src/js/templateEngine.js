let MyTemplateEngine = (template, data) => {
  let re = /{%([^%}]+)?%}/g
  let code = 'let a = [];'
  let cursor = 0
  let match

  let add = (line, isData) => {
    if (isData) {
      code += 'a.push(' + line + ');'
    } else {
      code += 'a.push("' + line + '");'
    }
  }

  while ((match = re.exec(template))) {
    add(template.slice(cursor, match.index), false)
    add(match[1], true)
    cursor = match.index + match[0].length
  }
  add(template.substr(cursor, template.length - cursor))
  code += 'return a.join("");'

  return new Function(code).apply(data)
}

export default MyTemplateEngine
