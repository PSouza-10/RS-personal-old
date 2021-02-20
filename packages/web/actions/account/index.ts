import { AccountActions } from '../types'
import axios from 'axios'
export default function withDispatch(state, dispatch) {
  const setLoading = (val :boolean) => {
    console.log(state)
    console.log("SetLoading to " +  !state.account.loading)
    dispatch({
      type: AccountActions.SET_LOADING,
      payload: val
    })
  }
  const setError = msg => {
    dispatch({
      type: AccountActions.SET_ERROR,
      payload: msg
    })
  }
  const actions = {
    async register(accountData,cb ?: ( data) => any ) {
      setLoading(true)
      try {
        const {data} = await axios.post('/account/register', accountData)
        
       
        
          dispatch({
            type: AccountActions.SET_USER_DATA,
            payload: data
          })
      setLoading(false)

        cb && cb(data)
      }catch(e) {
        if(e.isAxiosError){
          setError(e.response.data)
        }  
        setLoading(false)
      
      }

    },
    async login(accountData,cb?: (data?) => any) {
      setLoading(true)
      setError({})
      try {
        const {data} = await axios.post('/account', accountData)
        
       
        
        dispatch({
          type: AccountActions.SET_USER_DATA,
          payload: data
        })
      setLoading(false)

        cb && cb()
      }catch(e) {
        if(e.isAxiosError){
          setError(e.response.data)
        }  
      setLoading(false)

      }
     

    }
  }

  return {
    ...actions
  }
}
