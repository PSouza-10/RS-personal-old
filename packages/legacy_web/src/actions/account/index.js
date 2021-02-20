import { AccountActions } from '../types'
import handleResponse from '../handleResponse'
import axios from 'axios'
export default function withDispatch(state, dispatch) {
  const setLoading = () => {
    dispatch({
      type: AccountActions.SET_LOADING,
      payload: !state.account.Loading
    })
  }
  const setError = msg => {
    dispatch({
      type: AccountActions.SET_ERROR,
      payload: msg
    })
  }
  const actions = {
    async register(accountData) {
      setLoading()

      const response = await axios.post('/account/register', accountData)

      const data = await handleResponse(response)

      if (data.type === 'ERROR') {
        setError(data.msg)
      } else {
        dispatch({
          type: AccountActions.SET_USER_DATA,
          payload: data
        })
      }
      setLoading()
    },
    async login() {}
  }

  return {
    ...actions
  }
}
