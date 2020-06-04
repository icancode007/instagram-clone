import axios from 'axios';
import jwt from 'jsonwebtoken';
import { AnyAction, Dispatch } from 'redux';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { JWTDecoded } from '../utils/types';
import { AUTH_USER } from './actionTypes';

export function authenticateUser(user: JWTDecoded): AnyAction {
  return {
    type: AUTH_USER,
    user,
  };
}

export function signUp(data: URLSearchParams) {
  return async (dispatch: Dispatch) => {
    try {
      const req = await axios.post('/signUp', new URLSearchParams(data));
      const tkn = req.data;
      localStorage.setItem('jwtToken', tkn);
      setAuthorizationToken(tkn);
      dispatch(authenticateUser(jwt.decode(tkn)));
      return tkn;
    } catch (e) {
      return e;
    }
  };
}

export function signIn(data: URLSearchParams) {
  return async (dispatch: Dispatch) => {
    try {
      const req = await axios.post('/signIn', new URLSearchParams(data));
      const tkn = req.data;
      localStorage.setItem('jwtToken', tkn);
      setAuthorizationToken(tkn);
      dispatch(authenticateUser(jwt.decode(tkn)));
      return tkn;
    } catch (e) {
      return e;
    }
  };
}
