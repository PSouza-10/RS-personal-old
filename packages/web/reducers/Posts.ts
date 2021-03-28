import { PostActions } from "../actions";

export const initialState = {
  posts: [],
  loading: false,
};
type State = typeof initialState;

function reduce(state = initialState, { type, payload }): State {
  switch (type) {
    case PostActions.SET_POSTS:
      return {
        ...state,
        posts: payload,
      };
    case PostActions.SET_LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
}

export default reduce;
