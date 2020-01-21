import { AUTH_USER } from './actionTypes';

export function signUp(data) {
  return dispatch => {
      fetch( '/signUp', generatePostSettings(data) ).then(data => {
         console.log("DATA", data);
      });
  }
}

export function signIn(data) {
    return dispatch => {
        fetch( '/signIn', generatePostSettings(data) ).then(data => {
            console.log("DATA", data);
        });
    }
}

const generatePostSettings = (data) => ({
    method: 'POST',
    body: new URLSearchParams(data),
});