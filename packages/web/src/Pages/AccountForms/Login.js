import React from 'react'
import { Container, LoginForm, Banner, Logo } from './styles'
import { FormField } from '../../components'
import { IoMdKey, IoMdMail } from 'react-icons/io'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
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
        <Logo />
        <h2>Login</h2>
        <FormField
          name='email'
          type='email'
          label='E-Mail'
          autoFocus
          value={formData.email}
          onChange={handleChange}
          icon={<IoMdMail />}
        />
        <FormField
          name='senha'
          type='password'
          label='Senha'
          value={formData.senha}
          onChange={handleChange}
          icon={<IoMdKey />}
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
