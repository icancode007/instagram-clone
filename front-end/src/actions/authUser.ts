import axios from 'axios';
import jwt from 'jsonwebtoken';
import {AnyAction, Dispatch} from 'redux';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { AUTH_USER } from './actionTypes';
import { JWTDecoded } from './types';

export function signUp(data: URLSearchParams) {
  return async (dispatch: Dispatch) => {
      const req = await axios.post( '/signUp', new URLSearchParams(data));
  };
}

export function signIn(data: URLSearchParams) {
    return async (dispatch: Dispatch) => {
        try {
            const req = await axios.post('/signIn', new URLSearchParams(data));
            const tkn = req.data;
            localStorage.setItem('jwtToken', tkn);
            setAuthorizationToken(tkn);
            jwt.decode(tkn);
            dispatch(authenticateUser(jwt.decode(tkn)));
        } catch (e) {
            return e.response.data;
        }
    };
}

export function authenticateUser(user: JWTDecoded): AnyAction {
    return {
      type: AUTH_USER,
      user
    };
}
