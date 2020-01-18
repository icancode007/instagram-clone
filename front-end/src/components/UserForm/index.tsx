import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './style.scss';

interface State {
  isSigningIn: boolean;
}

export default class Counter extends React.Component<object, State> {
  public state = {
    isSigningIn: false
  };

  public toggleUserForm = (): void => {
      this.setState(
        (prevState: State) => this.setState({isSigningIn: !prevState.isSigningIn})
      );
  }

  public render(): JSX.Element {
    const { isSigningIn } = this.state;
    return isSigningIn
      ? <SignIn toggleUserForm={this.toggleUserForm} />
      : <SignUp toggleUserForm={this.toggleUserForm} />;
  }
}
