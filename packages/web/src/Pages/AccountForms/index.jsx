import React from 'react'
import { Container } from './styles'
import Login from './Login'
import Register from './Register'

export function AccountForms({ match }) {
  const forms = {
    login: <Login />,
    register: <Register />
  }

  return forms[match.params.form]
}
