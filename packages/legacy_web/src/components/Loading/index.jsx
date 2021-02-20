import React from 'react'
import { useSelector } from 'react-redux'
import { LoadingContainer } from './style'
export function Loading() {
  const state = useSelector(state => state)

  const isLoading = Object.keys(state).filter(key => state[key].loading)
  return (
    <LoadingContainer isVisible={false}>
      <svg class='spinner' viewBox='0 0 50 50'>
        <circle
          class='path'
          cx='25'
          cy='25'
          r='20'
          fill='none'
          stroke-width='5'></circle>
      </svg>
    </LoadingContainer>
  )
}
