import { getUserLoginOrSigninMethod, UserBy } from '../helpers';
const warnings = {
  ACCOUNT_EXIST: (errHandle: string): string => {
    if (errHandle === undefined) { return; }
    // Todo: formulate a single regex to do this
    const frontHandleIdx = errHandle.search('=+') + 2; // index where original string should become a substring
    const frontHandle = errHandle.slice(frontHandleIdx, errHandle.length - 1);
    const rearHandleIdx = frontHandle.search('[\)]'); // idx where substring slice should finish
    const handle = frontHandle.slice(0, rearHandleIdx);

    const strModel = `An account with ${handle} as a username already exists`;
    switch (getUserLoginOrSigninMethod(handle)) {
      case UserBy.EMAIL:
        return strModel.replace('a username', 'an email');
      case UserBy.PHONE_NUMBER:
       return strModel.replace('username', 'Phone Number');
      default:
       return strModel;
    }
  },
  INCORRECT_PASSWORD: 'Sorry, your password was incorrect. Please double-check your password',
  USER_DOES_NOT_EXIST : 'The username you entered doesn\'t belong to an account. Please check your username and try again.',
};

export default warnings;
