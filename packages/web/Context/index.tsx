import { createContext, useContext,useReducer } from 'react';
import initializeActions from '../actions'
import rootReducer from './rootReducer';
import {initialState} from '../reducers'

interface ContextData {
  data : any,
  actions ?: {
    [x:string] : (any) => Promise<void> 
  }
}
const GlobalContext = createContext<ContextData>({
  data : initialState,
  
});

function GlobalWrapper({ children }) {


  const [state,dispatch] = useReducer(rootReducer,initialState)
  
  const actions = initializeActions(state,dispatch)

  const providerValue:ContextData = {
    data: state,
    actions: {
      ...actions
    }
  }

  return (
    <GlobalContext.Provider value={providerValue}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext(getState : (state) => any) {
  const state = useContext(GlobalContext);
  
  const selected = getState(state)
  return selected
}
export default GlobalWrapper