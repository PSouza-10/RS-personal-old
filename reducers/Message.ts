import { MessageActions } from "../actions";
export const initialState = {
  title: "",
  text: "",
  color: "",
  visible: false,
};

type StateType = typeof initialState;
function reduce(state = initialState, { type, payload }): StateType {
  switch (type) {
    case MessageActions.SET_MESSAGE:
      return {
        ...state,
        ...payload,
      };
    case MessageActions.SET_VISIBILITY:
      return {
        ...state,
        visible: payload,
      };
    default:
      return state;
  }
}

export default reduce;
