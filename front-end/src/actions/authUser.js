import { AUTH_USER } from './actionTypes';

export function signUp(data) {
  const postSettings = {
      method: 'POST',
      body: new URLSearchParams(data),
  };
  return dispatch => fetch( '/signUp', postSettings )
}

export function authUser(data) {
    return {
        type: AUTH_USER,
        id: data.id
    }
}