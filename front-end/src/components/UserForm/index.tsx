import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signUp } from '../../actions/authUser';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './style.scss';

interface State {
  isSigningIn: boolean;
}

interface Props {
    signIn: any;
    signUp: any;
}

class UserForm extends Component <Props, State> {
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
    const { signIn: signInReq, signUp: signUpReq } = this.props;

    return isSigningIn
      ? <SignIn  signIn={signInReq} toggleUserForm={this.toggleUserForm} />
      : <SignUp  signUp={signUpReq} toggleUserForm={this.toggleUserForm} />;
  }
}

export default connect(null, {signIn, signUp})(UserForm);
