import { PostActions } from "../types";
import axios from "axios";
export default function withDispatch(state, dispatch) {
  const setLoading = (val: boolean) => {
    dispatch({
      type: PostActions.SET_LOADING,
      payload: val,
    });
  };

  return {
    async getPosts() {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/posts");

        dispatch({
          type: PostActions.SET_POSTS,
          payload: data,
        });
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    },
  };
}
