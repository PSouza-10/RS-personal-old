import React from 'react'
import styled, { css } from 'styled-components'
import posts from '../../placeholder/posts'
import { Filter, Post } from '../../components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
 
  color: ${({ theme }) => theme.colors.fg};
  
  ${({theme:{breakpoints}}) => css`
    @media (min-width: ${breakpoints.md}){
      flex-direction: row;
      align-items: flex-start;
      position: relative;
      & > div:first-child{
        order: 2;
        flex: 1;
        
      }
    .posts{
      order: 1;
      display:flex;
      flex-direction: column;
      
      flex-basis: 66%; 
    }
    } 
  `}

`

export function Blog() {
  return (
    <Container>
      <Filter />
      <div className="posts">

        {posts.map(post => (
          <Post key={post._id} {...post} />
          ))}
      </div>
    </Container>
  )
}
