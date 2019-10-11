export const login = (user: object) => {
  //move logic for login/signIn fetch here
}

export const isValidPhoneNumber = (input: string): boolean => {
  let cleanedInput = "";

  if (/^\d+$/.test(input) && input.length === 10) {
    return true;
  }

  for (let i = 0; i < input.length; i++) {
    if (/^\d+$/.test(input[i])) {
      cleanedInput += input[i];
    }
  }

  if (/^\d+$/.test(cleanedInput) && cleanedInput.length === 10) {
    return true;
  }
  return false;
}

export const isValidEmail = (input: string): boolean => {
  if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\w{2,3})+$/.test(input)) {
    return true;
  }
  return false;
}

export const isValidUserName = (input: string): boolean => {
  if (!input.length) {
    return false;
  }

  for (let i = 0; i < input.length; i++) {
    if (!(/^[a-zA-Z0-9]+$/.test(input[i]))) {
      return false;
    }
  }
  return true;
}

export const isValidPassword = (input: string): boolean => {
  return input.length >= 6;
}

export const isValidName = (input: string): boolean => {
  return input.length >= 3;
}
