import React from 'react'
import { LoadingContainer } from './style'
export function Loading() {
  return (
    <LoadingContainer>
      <svg class='spinner' viewBox='0 0 50 50'>
        <circle
          className='path'
          cx='25'
          cy='25'
          r='20'
          fill='none'
          strokeWidth='5'></circle>
      </svg>
    </LoadingContainer>
  )
}
