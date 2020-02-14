import { isEmpty } from 'lodash';
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
            isAuthenticated: !isEmpty(action.user),
            user: action.user,
        };
    default:
        return state;
 }
};
