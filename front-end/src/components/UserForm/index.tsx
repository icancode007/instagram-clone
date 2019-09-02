import * as React from 'react';
import './style.scss';
import SignUp from './SignUp';
import SignIn from './SignIn';

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

  componentDidMount(): void {
    fetch('/root')
      .then(res => res.json())
      .then(data => console.log(data));
  }

  toggleUserForm = (origin: string): void => {
    origin === 'signUp'
      ? this.setState({ isSigningIn: true })
      : this.setState({ isSigningIn: false })
  }

  isValidPhoneNumber = (input: string): boolean => {
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

  isValidEmail = (input: string): boolean => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
      return true;
    }
    return false;
  }

  isValidUserName = (input: string): boolean => {

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

  isValidPassword = (input: string): boolean => {
    return input.length >= 6;
  }

  isValidName = (input: string): boolean => {
    return input.length >= 3;
  }

  render(): JSX.Element {
    const { isSigningIn } = this.state;
    return isSigningIn
      ? <SignIn toggleUserForm={this.toggleUserForm} isValidUserName={this.isValidUserName} isValidPhoneNumber={this.isValidPhoneNumber} isValidEmail={this.isValidEmail} isValidPassword={this.isValidPassword} isValidName={this.isValidName} />
      : <SignUp toggleUserForm={this.toggleUserForm} isValidUserName={this.isValidUserName} isValidPhoneNumber={this.isValidPhoneNumber} isValidEmail={this.isValidEmail} isValidPassword={this.isValidPassword} isValidName={this.isValidName} />
  }
}
