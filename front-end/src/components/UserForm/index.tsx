import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
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
    auth: { isAuthenticated: boolean, user: { username: string, id: number } };
}

class UserForm extends Component <Props, State> {
   state = {
    isSigningIn: false
  };

   componentDidMount() {
     const { user, isAuthenticated } = this.props.auth;

     if (isAuthenticated && window.location.pathname === '/') {
       window.location.href = `/${user.username}`;
       return;
     }
  }

   toggleUserForm = (): void => {
      this.setState(
        (prevState: State) => this.setState({isSigningIn: !prevState.isSigningIn})
      );
  }

   render(): JSX.Element {
    const { isSigningIn } = this.state;
    const { signIn: signInReq, signUp: signUpReq, auth } = this.props;

    if(auth.isAuthenticated) {
      return <>...Loading</>
    }

    return isSigningIn
      ? <SignIn  signIn={signInReq} toggleUserForm={this.toggleUserForm} />
      : <SignUp  signUp={signUpReq} toggleUserForm={this.toggleUserForm} />;
  }
}

const mapStateToProps = (state: RootState) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {signIn, signUp})(UserForm);
