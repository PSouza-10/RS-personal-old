import { AccountActions } from '../actions'
const initialState = {
  user: {
    _id: '',
    name: '',
    picture: '',
    isAdmin: false
  },
  err: '',
  loading: false
}
function reduce(state = initialState, { type, payload }) {
  switch (type) {
    case AccountActions.SET_USER_DATA:
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
