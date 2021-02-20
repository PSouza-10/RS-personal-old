import React, {useState} from 'react'
import { Container } from 'propstyledui'
import { FormField, DateField } from '../../components'
import { ContainerCSS } from '../generalStyle'
import { css } from 'styled-components'



export function About() {
  const [formData, setFormData] = useState({
    date : new Date(),
    name: ''
  })
  
  const handleForm = ({target: {name,value}}) => {
    setFormData({
      ...formData,
      [name] :  value
    })
  }
return <Container CSS={css`
  ${ContainerCSS}
 

   margin-top: 10px;
  
    
` } direction="column">
  <h1>
    {JSON.stringify(formData)}
  </h1>
      <FormField type="text" onChange={handleForm} value={formData.name} name="name" label="Nome"/>
      <DateField value={formData.date} label="Alguma data" onChange={(val) => handleForm({target: {name: 'date', value : val}})}/>
  </Container> 
}
