import Account, {initialState as account} from './Account'
const initReducers = () => {
  return {

    account: Account
    
  }
}


export const initialState = {
  account
}
export default initReducers
