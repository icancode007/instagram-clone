export function signUp(data) {
  return async (dispatch) => {
      const req = await fetch( '/signUp', generatePostSettings(data));
      const dataRes = await req.json();
      console.log(dataRes);
  }
}

export function signIn(data) {
    return async (dispatch) => {
        const req = await fetch('/signIn', generatePostSettings(data));
        const dataRes = await req.json();

        localStorage.setItem('jwtToken', dataRes);
    }
}

const generatePostSettings = (data) => ({
    method: 'POST',
    body: new URLSearchParams(data),
});