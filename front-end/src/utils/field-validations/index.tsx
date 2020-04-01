export const isValidPhoneNumber = (input: string): boolean => {
  let cleanedInput = '';

  if (/^\d+$/.test(input) && input.length === 10) {
    return true;
  }

  for (const i of input) {
    if (/^\d+$/.test(i)) {
        cleanedInput += i;
    }
  }

  if (/^\d+$/.test(cleanedInput) && cleanedInput.length === 10) {
    return true;
  }
  return false;
};

export const isValidEmail = (input: string): boolean => {
  if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\w{2,3})+$/.test(input)) {
    return true;
  }
  return false;
};

export const isValidUserName = (input: string): boolean => {
  if (!input.length) {
    return false;
  }

  for (const i of input) {
    if (!(/^[a-zA-Z0-9]+$/.test(i))) { return false; }
  }
  return true;
};

export const isValidPassword = (input: string): boolean => {
  return input.length >= 6;
};

export const isValidName = (input: string): boolean => {
  return input.length >= 3;
};
