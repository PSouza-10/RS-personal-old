import styled from "styled-components";
import React from 'react'

const Container = styled.span<{hasContent: any}>`
  border: 1px solid var(--error);
  color:white;
  background-color: #f442;
  visibility: ${({hasContent}) => hasContent ? 'visible' : 'hidden'};
  opacity: ${({hasContent}) => hasContent ? '1' : '0'};
  transition: opacity 0.3s ease;
  padding: 8px 10px;
  border-radius: 0.5em;
  font-size: 0.8em;
`


export const Error:React.FC = ({children}) => {
 

  return (
      <Container hasContent={children} className="form-error"> 
        {children}
      </Container> 
  )
}