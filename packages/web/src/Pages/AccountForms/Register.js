import React from 'react'
import { Container, RegisterForm, Logo } from './styles'
import { FormField } from '../../components'
import { IoMdKey, IoMdMail, IoMdPerson } from 'react-icons/io'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'

const Register = () => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    name: ''
  })
  const handleChange = ({ target: { value, name } }) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }
  return (
    <Container>
      <RegisterForm>
        <div className='form-logo-wrapper'>
          <Logo height='280px' width='220px' />
        </div>
        <form className='form-wrapper'>
          <h2>Cadastro</h2>
          <FormField
            name='name'
            type='text'
            label='Nome'
            autoFocus
            value={formData.name}
            onChange={handleChange}
            icon={<IoMdPerson />}
          />
          <FormField
            name='email'
            type='email'
            label='E-Mail'
            validate={{
              validIf: 'email'
            }}
            value={formData.email}
            onChange={handleChange}
            icon={<IoMdMail />}
          />
          <FormField
            name='password'
            type='password'
            label='Senha'
            value={formData.password}
            onChange={handleChange}
            validate={{
              min: 5,
              max: 12,
              validIf: 'upper,lower,digits'
            }}
            icon={<IoMdKey />}
            subtitle='Não use informações pessoais'
            useVisibility
            useCounter
          />
          <p>
            Já tem conta? Faça o login{' '}
            <Link className='inline' to='/account/login'>
              aqui
            </Link>
          </p>
          <button className='button'>Cadastrar</button>
        </form>
      </RegisterForm>
    </Container>
  )
}

export default Register
