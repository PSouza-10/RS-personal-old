import React from 'react'
import { useState } from 'react'
import { FormFieldContainer, Container } from './styles'
import handleValidate from './validate'
export function FormField({
  label = '',
  name = '',
  icon = null,
  subtitle = '',
  validate = {},
  onChange = () => {},
  value,
  onBlur = () => {},
  onFocus = () => {},
  useCounter = false,
  ...inputProps
}) {
  const [isFocused, setFocused] = useState(false)
  const [validity, setValidity] = useState({
    isValid: true,
    stringHas: {}
  })
  const [length, setLength] = useState(value ? value.length : 0)
  const messages = {
    symbols: 'Deve conter símbolos como: &, *, #, etc.',
    digits: 'Deve conter digitos de 0 a 9.',
    upper: 'Deve conter letras maiúsculas',
    lower: 'Deve conter letras minúsculas',
    nospace: 'Não pode conter espaços',
    min: 'Mínimo de ' + validate.min + ' caracteres',
    max: 'Máximo de ' + validate.max + ' caracteres'
  }

  const inputRef = React.useRef(null)
  const focus = () => {
    inputRef.current.focus()
  }
  const handleChange = e => {
    if (useCounter) {
      setLength(e.target.value.length)
    }
    console.log(validate)
    if (Object.keys(validate).length > 0) {
      const val =
        inputProps.type === 'number' ? parseInt(e.target.value) : e.target.value
      const newValidity = handleValidate(val, validate)

      setValidity(newValidity)
    }
    onChange && onChange(e)
  }
  return (
    <Container
      isFocused={isFocused}
      valid={validity.isValid}
      className='input-container'>
      {icon &&
        React.cloneElement(icon, { className: 'input-icon', onClick: focus })}
      <FormFieldContainer
        color={validity.isValid ? 'var(--primary)' : 'var(--error)'}>
        <input
          name={name}
          required
          value={value}
          onChange={handleChange}
          autoComplete='off'
          onFocus={e => {
            setFocused(true)
            onFocus && onFocus(e)
          }}
          onBlur={e => {
            setFocused(false)
            onBlur && onBlur(e)
          }}
          {...inputProps}
          ref={inputRef}
        />
        <label htmlFor={name} className='field-label'>
          <span className='field-content-name'>{label}</span>
          {useCounter && <span className='field-content-length'>{length}</span>}
        </label>
      </FormFieldContainer>
      {subtitle && <span className='subtitle'>{subtitle}</span>}
      {validity.stringHas !== {} && validate !== {} && (
        <ul>
          {Object.keys(validity.stringHas).map(has => (
            <li
              key={has}
              className={validity.stringHas[has] ? 'valid' : 'invalid'}>
              {messages[has]}
            </li>
          ))}
        </ul>
      )}
    </Container>
  )
}
