import React from 'react';
import './style.scss';
import SignUp from './SignUp';
import SignIn from './SignIn';

interface State {
  isSigningIn: boolean,
}

export default class Counter extends React.Component<Object, State> {
  state = {
    isSigningIn: false
  }

  toggleUserForm = (): void => {
      this.setState(
        (prevState: State) => this.setState({isSigningIn: !prevState.isSigningIn})
      );
  }

  render(): JSX.Element {
    const { isSigningIn } = this.state;
    return isSigningIn
      ? <SignIn toggleUserForm={this.toggleUserForm} />
      : <SignUp toggleUserForm={this.toggleUserForm} />
  }
}
