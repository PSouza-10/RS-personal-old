import React from 'react'
import DatePicker from 'react-date-picker/dist/entry.nostyle'
import '../../../styles/Calendar.module.css'
import '../../../styles/DatePicker.module.css'
export function DateField({ value, label, onChange }) {
  return (
    <div className='dateWrapper'>
      <label htmlFor={label.replace(' ', '')}>{label}</label>
      <DatePicker
        onChange={onChange}
        value={value}
        name={label.replace(' ', '')}
      />
    </div>
  )
}
