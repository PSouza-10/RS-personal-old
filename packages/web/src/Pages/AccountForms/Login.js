import React from 'react'
import { Container, LoginForm, Banner, Logo } from './styles'
import { FormField } from '../../components'
import { IoMdKey, IoMdMail } from 'react-icons/io'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const handleChange = ({ target: { value, name } }) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }
  return (
    <Container>
      <LoginForm>
        <Logo height='260px' width='180px' />
        <h2>Login</h2>
        <FormField
          name='email'
          type='email'
          label='E-Mail'
          autoFocus
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
          icon={<IoMdKey />}
          useVisibility
        />
        <span className='actions'>
          <p>
            Não tem conta? Crie uma{' '}
            <Link to='/account/register' className='inline'>
              aqui{' '}
            </Link>
          </p>
          <button className='button submit'>Entrar</button>
        </span>
      </LoginForm>
      <Banner>
        <h3 className='message'>
          O conhecimento e a vontade por si só não lhe trarão resultados, mas
          aliados a ação e disciplina podem fazer milagres
        </h3>
      </Banner>
    </Container>
  )
}

export default Login
