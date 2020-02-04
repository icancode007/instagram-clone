import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';

export function signUp(data) {
  return async (dispatch) => {
      const req = await axios.post( '/signUp', new URLSearchParams(data));
      console.log(req.data);
  }
}

export function signIn(data) {
    return async (dispatch) => {
        try {
            const req = await axios.post('/signIn', new URLSearchParams(data));
            const tkn = req.data;
            localStorage.setItem('jwttoken', tkn);
            setAuthorizationToken(tkn);
        } catch (e) {
            return e.response.data
        }
    }
}
