
export enum UserBy {
   USERNAME = 'username',
   EMAIL = 'email',
   PHONE_NUMBER = 'phone_number',
}

export const getUserLoginOrSigninMethod = (handle: string): string => {
  if (handle.includes('@')) {
     return UserBy.EMAIL;
  } else if (Number(handle)) {
     return UserBy.PHONE_NUMBER;
  } else {
     return UserBy.USERNAME;
  }
};
