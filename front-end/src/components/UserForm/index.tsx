import * as React from 'react';
import './style.scss';
import SignUp from './SignUp';
import SignIn from './SignIn';
import {
    isValidUserName,
    isValidPhoneNumber,
    isValidPassword,
    isValidEmail,
    isValidName
  } from '../../bll/authoringBll';

interface State {
  isSigningIn: boolean,
}

// To be used in SignIn and SignUp components
export interface UserFormProps {
  toggleUserForm: any,
  isValidEmail: any,
  isValidPhoneNumber: any,
  isValidUserName: any,
  isValidPassword: any,
  isValidName: any
}

export default class Counter extends React.Component<Object, State> {
  //could be refactored to functional component if hooks will be used
  state = {
    isSigningIn: false
  }

  toggleUserForm = (origin: string): void => {
    origin === 'signUp'
      ? this.setState({ isSigningIn: true })
      : this.setState({ isSigningIn: false })
  }

  render(): JSX.Element {
    const { isSigningIn } = this.state;
    return isSigningIn
      ? <SignIn
          toggleUserForm={this.toggleUserForm}
          isValidUserName={isValidUserName}
          isValidPhoneNumber={isValidPhoneNumber}
          isValidEmail={isValidEmail}
          isValidPassword={isValidPassword}
          isValidName={isValidName}
        />
      : <SignUp
          toggleUserForm={this.toggleUserForm}
          isValidUserName={isValidUserName}
          isValidPhoneNumber={isValidPhoneNumber}
          isValidEmail={isValidEmail}
          isValidPassword={isValidPassword}
          isValidName={isValidName}
        />
  }
}
