import { AccountActions } from "../types";
import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_URL
    : "http://localhost:5000";
export default function withDispatch(state, dispatch) {
  const setLoading = (val: boolean) => {
    dispatch({
      type: AccountActions.SET_LOADING,
      payload: val,
    });
  };
  const setError = (msg) => {
    dispatch({
      type: AccountActions.SET_ERROR,
      payload: msg,
    });
  };
  const actions = {
    async register(accountData, cb?: (data) => any) {
      setLoading(true);
      setError({});
      try {
        const { data } = await axios.post("/account", accountData);

        dispatch({
          type: AccountActions.SET_USER_DATA,
          payload: data,
        });
        setLoading(false);

        cb && cb(data);
      } catch (e) {
        if (e.isAxiosError) {
          setError(e.response.data);
        }
        setLoading(false);
      }
    },
    async login(accountData, cb?: (data?) => any) {
      setLoading(true);
      setError({});
      try {
        const { data } = await axios.post("/account/login", accountData);

        dispatch({
          type: AccountActions.SET_USER_DATA,
          payload: data,
        });
        setLoading(false);

        cb && cb();
      } catch (e) {
        if (e.isAxiosError) {
          setError(e.response.data);
        }
        setLoading(false);
      }
    },
    async refreshToken(token: string) {
      setLoading(true);
      setError({});
      try {
        const { data } = await axios.get("/account", {
          headers: {
            authorization: token,
          },
        });

        dispatch({
          type: AccountActions.SET_USER_DATA,
          payload: { user: data },
        });
        setLoading(false);
      } catch (e) {
        if (e.isAxiosError) {
          setError(e.response.data);
        }
        setLoading(false);
      }
    },
  };
  return {
    ...actions,
  };
}
