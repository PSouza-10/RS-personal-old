import React from 'react'
import { Call, Container, Image } from './styles'
import { Link } from 'react-router-dom'
import { trainer } from '../image'

export function Hero() {
  return (
    <Container>
      <Call>
        <h2>Consultoria voltada ao aprendizado</h2>
        <p>
          Sua saúde e estética vem das suas escolhas, mas pode ser que você não
          saiba quais escolhas fazer para ter resultados. Por isso o objetivo
          aqui é te ensinar, e auxiliar em seu crescimento pessoal.
        </p>
        <span>
          <Link className='button' to='/main'>
            {' '}
            Quero aprender
          </Link>
        </span>
      </Call>
      <Image src={trainer} alt='Banner' />
    </Container>
  )
}
