import React from 'react'
import { FormFieldContainer } from './styles'

export function FormField({ label, name, ...inputProps }) {
  return (
    <FormFieldContainer>
      <input name={name} required autoComplete='off' {...inputProps} />
      <label htmlFor={name} className='field-label'>
        <span className='field-content-name'>{label}</span>
      </label>
    </FormFieldContainer>
  )
}
