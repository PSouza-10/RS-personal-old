import { AccountActions } from '../actions'
import { generateProfilePic } from '../utils'
export const initialState = {
  user: {
    _id: '',
    name: '',
    picture: '',
    isAdmin: false
  },
  token: '',
  err: {
    _id: '',
    msg: ""
  },
  loading: false

}
function reduce(state = initialState, { type, payload }) {
  switch (type) {
    case AccountActions.SET_USER_DATA:

      if(!payload.user.picture){
      const {_id,name} = payload.user
        localStorage.setItem('picURL',generateProfilePic(name,_id))
      }

      return {
        ...state,
        user: payload.user,
        token: payload.token
      }
    case AccountActions.SET_ERROR:
      return {
        ...state,
        err: payload
      }
    case AccountActions.SET_LOADING:
      return {
        ...state,
        loading: payload
      }
    default:
      return state
  }
}

export default reduce
