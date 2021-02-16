import React from 'react'
import { Container } from 'propstyledui'
import {ArticleRenderer} from '../../components'

export function Article() {
  

  return <Container>
    <h1>Title</h1>
    <span>author : date</span>
    <ArticleRenderer/>
  </Container>
}
