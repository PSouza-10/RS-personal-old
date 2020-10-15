import React from 'react'
import styled from 'styled-components'
import posts from '../services/assets/placeholder/posts'
import { Filter, Post } from '../components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  /* padding: 10px; */
  width: 100vw;
  color: ${({ theme }) => theme.colors.fg};
`

export function Blog() {
  return (
    <Container>
      <Filter />
      {posts.map(post => (
        <Post key={post._id} {...post} />
      ))}
    </Container>
  )
}
