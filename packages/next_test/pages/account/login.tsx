import React from 'react'
import { Container, LoginForm, Banner, FormLogo } from './styles'
import { FormError, FormField, Loading } from '../../components'
import { IoMdKey, IoMdMail } from 'react-icons/io'
import { useState } from 'react'
import  Link  from 'next/link'
import { useGlobalContext } from '../../Context'
import  Router  from 'next/router'

const Login = () => {
  const [formData, setFormData] = useState({ 
    email: '',
    password: ''
  })
  const [isValid,setValid] = useState({
    email: false,
    password: false
   
  })
  const handleChange = ({ target: { value, name } },valid) => {
    setFormData({
      ...formData,
      [name]: value
    })
    setValid({
      ...isValid,
      [name]: valid
    })
  }

  const {actions,data} = useGlobalContext(state => state)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    actions.login(formData,(data) => {
      Router.push('/')
    })
  }
  const buttonEnabled = isValid.email && isValid.password
  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        {data.account.loading ? <Loading/> : 
          <> 
        <FormLogo height='260px' width='180px' />
        {data.account.err._id ?  <FormError>
            {data.account.err.msg}
          </FormError>
        :
        <h2>Login</h2>
        }
          
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
            Não tem conta? Crie uma {' '}
            <Link href='/account/register' passHref>
              <a className='inline'>
                aqui
              </a>
            </Link>
          </p>
          
          <button className='button submit' type="submit" disabled={!buttonEnabled}>Entrar</button>
        </span>
        </>
        }
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
