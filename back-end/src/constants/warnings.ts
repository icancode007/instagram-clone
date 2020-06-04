import { getUserLoginOrSigninMethod, UserBy } from "../helpers";

// eslint-disable-next-line
const warnings: any = {
  ACCOUNT_EXIST: (account: string): string => {
    if (account === undefined) return;
    // Todo: formulate a single regex to do this
    const frontHandleIdx = account.search("=+") + 2; // index where original string should become a substring
    const frontHandle = account.slice(frontHandleIdx, account.length - 1);
    const rearHandleIdx = frontHandle.search("[)]"); // idx where substring slice should finish
    const handle = frontHandle.slice(0, rearHandleIdx);

    const strModel = `An account with ${handle} as an username already exists`;
    switch (getUserLoginOrSigninMethod(handle)) {
      case UserBy.EMAIL:
        strModel.replace("an username", "an email");
        break;
      case UserBy.PHONE_NUMBER:
        strModel.replace("username", "Phone Number");
        break;
      default:
        break;
    }
    // eslint-disable-next-line consistent-return
    return strModel;
  },
  INCORRECT_PASSWORD:
    "Sorry, your password was incorrect. Please double-check your password",
  USER_DOES_NOT_EXIST:
    "The username you entered doesn't belong to an account. Please check your username and try again.",
};

export default warnings;
