const regEx = {
  symbols: '.*[@#$%^&-+=()]',
  nospace: '\\S+$',
  upper: '.*[A-Z]',
  lower: '.*[a-z]',
  digits: '.*[0-9]',
  // email: '.+@+.+\\.+.'
  email: '.+@+.+\\.+.'
}

const evaluateWithRegEx = (val, params) => {
  let validation = {
    isValid: true,
    stringHas: {}
  }
  const paramsArr = params.split(',')
  for (let term in regEx) {
    if (paramsArr.includes(term)) {
      let isValid = new RegExp(`(?=${regEx[term]})`).test(val)
      console.log(isValid)
      if (!isValid) validation.isValid = false
      validation.stringHas[`${term}`] = isValid
    }
  }

  return validation
}

export default function handleValidate(
  value = '',
  { validIf = '', min = 0, max = 0 }
) {
  const type = typeof value
  if (type === 'string') {
    let containsSpecified = true
    if (validIf) {
      containsSpecified = evaluateWithRegEx(value, validIf)
    }
    const lenMatch = value.length >= min && value.length <= max
    let validation = {
      isValid:
        containsSpecified.isValid && (lenMatch || min === 0 || max === 0),
      stringHas: {
        ...containsSpecified.stringHas
      }
    }
    if (min !== 0) {
      validation.stringHas.min = value.length >= min
    }
    if (max !== 0) {
      validation.stringHas.max = value.length <= max
    }
    return validation
  } else if (type === 'number') {
    return value >= min && value <= max
  }
}
