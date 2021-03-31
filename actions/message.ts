import { MessageActions } from "./types";

export default function withDispatch(state, dispatch) {
  return {
    async setMessage(message) {
      dispatch({
        type: MessageActions.SET_MESSAGE,
        payload: message,
      });
    },
    async setMessageVisibility(to: boolean) {
      dispatch({
        type: MessageActions.SET_VISIBILITY,
        payload: to,
      });
    },
  };
}
