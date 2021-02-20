import React from 'react'
import { useState } from 'react'
import { FormFieldContainer, Container } from './styles'
import handleValidate from './validate'
import { IoMdEyeOff, IoMdEye } from 'react-icons/io'
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
  useVisibility = false,
  ...inputProps
}) {
  const [isFocused, setFocused] = useState(false)
  const [validity, setValidity] = useState({
    isValid: true,
    stringHas: {}
  })
  const [length, setLength] = useState(value ? value.length : 0)
  const [passwordVisible, setPasswordVisible] = useState(false)

  const messages = {
    symbols: 'Deve conter símbolos como: &, *, #, etc.',
    digits: 'Deve conter digitos de 0 a 9.',
    upper: 'Deve conter letras maiúsculas',
    lower: 'Deve conter letras minúsculas',
    nospace: 'Não pode conter espaços',
    email:
      'Endereço de email ' + (validity.stringHas.email ? 'válido' : 'inválido'),
    min: validate.min ? 'Mínimo de ' + validate.min + ' caracteres' : false,
    max: validate.max ? 'Máximo de ' + validate.max + ' caracteres' : false
  }

  const inputRef = React.useRef(null)
  const focus = () => {
    inputRef.current.focus()
  }
  const toggleVisible = () => {
    if (inputRef.current.type === 'password') {
      setPasswordVisible(true)
      inputRef.current.type = 'text'
    } else {
      setPasswordVisible(false)

      inputRef.current.type = 'password'
    }
  }
  const visibleIcon = passwordVisible ? (
    <IoMdEye className='visible-icon' onClick={toggleVisible} />
  ) : (
    <IoMdEyeOff className='visible-icon' onClick={toggleVisible} />
  )
  const handleChange = e => {
    if (useCounter) {
      setLength(e.target.value.length)
    }

    if (Object.keys(validate).length > 0) {
      const val =
        inputProps.type === 'number' ? parseInt(e.target.value) : e.target.value
      const newValidity = handleValidate(val, validate)
      console.log(newValidity)
      setValidity(newValidity)
    }
    onChange && onChange(e)
  }
  const inputPadding = (useCounter ? 1 : 0) + (useVisibility ? 1 : 0)
  const numOfvalidationItems = Object.keys(validity.stringHas).length
  return (
    <Container
      isFocused={isFocused}
      valid={validity.isValid}
      numOfItems={numOfvalidationItems}
      className='input-container'>
      {icon &&
        React.cloneElement(icon, { className: 'input-icon', onClick: focus })}
      <FormFieldContainer
        color={validity.isValid ? 'var(--primary)' : 'var(--error)'}
        padding={inputPadding}>
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
        {useVisibility && visibleIcon}
      </FormFieldContainer>
      {subtitle && <span className='subtitle'>{subtitle}</span>}
      {validity.stringHas !== {} && validate !== {} && (
        <ul>
          {Object.keys(validity.stringHas).map(has =>
            messages[has] ? (
              <li
                key={has}
                className={validity.stringHas[has] ? 'valid' : 'invalid'}>
                {messages[has]}
              </li>
            ) : null
          )}
        </ul>
      )}
    </Container>
  )
}
