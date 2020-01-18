import { AUTH_USER } from '../actions/actionTypes';

export default (state = {}, action) => {
 switch(action.type) {
    case AUTH_USER:
        return {}
    default:
        return state    
 }
}