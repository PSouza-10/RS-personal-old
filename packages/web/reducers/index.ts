import Account, { initialState as account } from "./Account";
import Posts, { initialState as posts } from "./Posts";
const initReducers = () => {
  return {
    account: Account,
    posts: Posts,
  };
};

export const initialState = {
  account,
  posts,
};
export default initReducers;
