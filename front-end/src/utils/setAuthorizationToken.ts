import axios from 'axios';

const setAuthorizationToken = (token: string): void => {
  if (token) {
    // tslint:disable:no-string-literal
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export default setAuthorizationToken;
