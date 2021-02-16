import React from 'react'
import { Container, RegisterForm, FormLogo } from './styles'
import { FormField,FormError, Loading } from '../../components'
import { IoMdKey, IoMdMail, IoMdPerson } from 'react-icons/io'
import  Link  from 'next/link'
import Router from 'next/router'
import { useGlobalContext } from '../../Context'

const Register = () => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    name: ''
  })
  const [isValid,setValid] = React.useState({
    email: false,
    password: false,
    name: false
  })

  const handleChange = ({ target: { value, name } },valid) => {
    setFormData({
      ...formData,
      [name]: value,  
    })

    setValid({
      ...isValid,
      [name]: valid
    })
  }
  const {email,name,password} = isValid
  const {data,actions} = useGlobalContext((state) => state)
  
  const handleSubmit = (e : React.FormEvent<HTMLDivElement>) => {
    e.preventDefault()

    actions.register(formData, (data) => {
      Router.push('/')
    })
  }
  return (
    <Container>

      <RegisterForm onSubmit={handleSubmit}>

        
        <div className='form-logo-wrapper'>
          <FormLogo height='280px' width='220px' />
        </div>
        <form className='form-wrapper'>
          
        {
          data.account.loading ? <Loading/> : <> 
          
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
            <Link  href='/account/login' passHref>
              <a className='inline'>

              aqui
              </a>
            </Link>
          </p>
          <FormError>{data.account.err.msg}</FormError>
          <button className='button' disabled={!(email && name  && password)} type="submit">Cadastrar</button>
          </>
        }
        </form>
      </RegisterForm>
    </Container>
  )
}

export default Register
