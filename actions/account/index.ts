import { AccountActions, MessageActions } from "../types";
import axios from "axios";

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

  const warnEmailNotVerified = (emailVerified: boolean, email: string) => {
    if (!emailVerified) {
      dispatch({
        type: MessageActions.SET_MESSAGE,
        payload: {
          title: "Verificação de email",
          text:
            "Enviamos uma notificação para " +
            email +
            ". Confirme e tenha acesso a funcionalidade completa.",
          visible: true,
          color: "var(--bgContrast)",
        },
      });
    }
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
        warnEmailNotVerified(data.user.emailVerified, data.user.email);
        cb && cb(data);
      } catch (e) {
        if (e.isAxiosError && e.response) {
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
        warnEmailNotVerified(data.user.emailVerified, data.user.email);

        cb && cb();
      } catch (e) {
        if (e.isAxiosError && e.response) {
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
        warnEmailNotVerified(data.emailVerified, data.email);

        setLoading(false);
      } catch (e) {
        if (e.isAxiosError && e.response) {
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
