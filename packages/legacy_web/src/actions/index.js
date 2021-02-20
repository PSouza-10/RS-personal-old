import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Account from './account'

export * from './types'

export const ActionContext = React.createContext({})

export default function ActionProvider({ children }) {
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const actions = {
    ...Account(state, dispatch)
  }

  return (
    <ActionContext.Provider value={actions}>{children}</ActionContext.Provider>
  )
}
