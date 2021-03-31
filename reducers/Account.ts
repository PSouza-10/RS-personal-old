import { AccountActions } from "../actions";
export const initialState = {
  user: {
    id: null,
    firstName: "",
    lastName: "",
    isAdmin: false,
  },
  token: "",
  err: {
    id: "",
    msg: "",
  },
  loading: false,
};
function reduce(state = initialState, { type, payload }) {
  switch (type) {
    case AccountActions.SET_USER_DATA:
      if (payload.token) {
        localStorage.setItem("token", payload.token);
      }
      return {
        ...state,
        user: payload.user,
        token: payload.token || state.token,
      };
    case AccountActions.SET_ERROR:
      return {
        ...state,
        err: payload,
      };
    case AccountActions.SET_LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
}

export default reduce;
