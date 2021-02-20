import initReducers,{initialState} from '../reducers'

export interface Action {
    type : string,
    payload: any
}

const reducers = initReducers()
function rootReducer(state:any = initialState, {type ,payload} : Action){
    const target = type.split('_')[0].toLowerCase()
    
    return {
        ...state,
        [target] : reducers[target](state[target],{type,payload})
    }
}

export default rootReducer