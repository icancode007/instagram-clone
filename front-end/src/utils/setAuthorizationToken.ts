const setAuthorizationToken = (token: string): object => {
    let headers = {};
    if (token) {
        headers = {...headers, Authorization: `Bearer ${token}`};
    } else {
      /* tslint:disable: no-string-literal */
      delete headers['Authorization'];
    }
    return headers;
};

export default setAuthorizationToken;
