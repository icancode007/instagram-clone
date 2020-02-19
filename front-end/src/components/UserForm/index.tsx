import React, { Component } from 'react';
import { connect } from 'react-redux';
import {RouteComponentProps} from 'react-router';
import { signIn, signUp } from '../../actions/authUser';
import { RootState } from '../../utils/types';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './style.scss';

interface State {
  isSigningIn: boolean;
}

interface Props extends RouteComponentProps {
    signIn: any;
    signUp: any;
    auth: { isAuthenticated: boolean, user: object };
}

class UserForm extends Component <Props, State> {
  public state = {
    isSigningIn: false
  };

  public componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
        this.props.history.push('/');
    }
  }

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

const mapStateToProps = (state: RootState) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {signIn, signUp})(UserForm);
