const regEx = {
  symbols: '.*[@#$%^&-+=()]',
  nospace: '\\S+$',
  upper: '.*[A-Z]',
  lower: '.*[a-z]',
  digits: '.*[0-9]'
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
      if (!isValid) validation.isValid = false
      validation.stringHas[`${term}`] = isValid
    }
  }

  return validation
}

export default function handleValidate(
  value = '',
  { validIf = '', min = 0, max = 1 }
) {
  const type = typeof value
  if (type === 'string') {
    let containsSpecified = true
    if (validIf) {
      containsSpecified = evaluateWithRegEx(value, validIf)
    }
    const lenMatch = value.length >= min && value.length <= max
    return {
      isValid: containsSpecified.isValid && lenMatch,
      stringHas: {
        ...containsSpecified.stringHas,
        min: value.length >= min,
        max: value.length <= max
      }
    }
  } else if (type === 'number') {
    return value >= min && value <= max
  }
}
