import React from 'react'
import { Container } from 'propstyledui'
import { Hero } from '../components'
import { ContainerCSS } from './generalStyle'

export  function Home() {
  return <Container CSS={ContainerCSS}>
    <Hero/>
   
  </Container>
}
