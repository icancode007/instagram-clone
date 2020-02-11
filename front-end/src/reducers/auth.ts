import { AnyAction } from 'redux';
import { AUTH_USER } from '../actions/actionTypes';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default (state = initialState, action: AnyAction) => {
 switch (action.type) {
    case AUTH_USER:
        return {
            isAuthenticated: !(Object.entries(action.user).length === 0),
            user: action.user,
        };
    default:
        return state;
 }
};
