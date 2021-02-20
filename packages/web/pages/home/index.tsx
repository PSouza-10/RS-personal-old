import React from 'react'
import { Container, TrifectaWrapper } from './style'
import { Hero} from '../../components'

export function Home() {
  return (
    <Container>
      <Hero />
      <h3>Os três componentes do Desenvolvimento Pessoal</h3>

      <section className="explore">
       
        <Trifecta/>
      
      </section>
    </Container>
  )
}

const Trifecta = () => {
  return <TrifectaWrapper>
    <div className="triangle">

    </div>
  </TrifectaWrapper>
}