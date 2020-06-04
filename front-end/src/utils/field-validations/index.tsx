export const isValidPhoneNumber = (input: string): boolean => {
  let cleanedInput = '';

  if (/^\d+$/.test(input) && input.length === 10) {
    return true;
  }

  input.split('').forEach((c: string) => {
    if (/^\d+$/.test(c)) {
      cleanedInput += c;
    }
  });

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
  return input.split('').some((c: string) => /^[a-zA-Z0-9]+$/.test(c));
};

export const isValidPassword = (input: string): boolean => {
  return input.length >= 6;
};

export const isValidName = (input: string): boolean => {
  return input.length >= 3;
};
