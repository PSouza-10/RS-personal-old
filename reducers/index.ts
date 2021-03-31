import Account, { initialState as account } from "./Account";
import Message, { initialState as message } from "./Message";
const initReducers = () => {
  return {
    account: Account,
    message: Message,
  };
};

export const initialState = {
  account,
  message,
};
export default initReducers;
