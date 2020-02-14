import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export interface State {
    error: string;
    isSubmitButtonEnable: boolean;
    isShowingPassword: boolean;
    showBtnInPasswordInput: boolean;
    password: string;
    username: string;
}

interface Props extends RouteComponentProps {
  toggleUserForm: () => void;
  signIn: any;
}

class SignIn extends Component<Props, State> {
    public state = {
        error: '',
        isShowingPassword: false,
        isSubmitButtonEnable: false,
        password: '',
        showBtnInPasswordInput: false,
        username: '',
    };

    public handleUserNameChange = (event: { target: { value: string; }; }): void => {
        this.setState({ username: event.target.value });
    }

    public submit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        const { username, password } = this.state;

        const submitRes = await this.props.signIn({username, password});

        if (!Object.prototype.hasOwnProperty('error') && submitRes) {
            this.props.history.push(`/${username}`);
        }
    }

    public handlePasswordChange = (event: { target: { value: string } }): void => {
        if (event.target.value) {
            this.setState({
               password: event.target.value,
               showBtnInPasswordInput: true,
              });
        } else {
            this.setState({ showBtnInPasswordInput: false });
        }
    }

  public render() {
      const { toggleUserForm } = this.props;
      const { username, isShowingPassword, showBtnInPasswordInput, error } = this.state;
      let errorMessage;

      if (error === 'username') {
          errorMessage = (
              <div className='error-container'>
                  <span>The username you entered doesn't belong to an account.</span>
              </div>
          );
      } else if (error === 'password') {
          errorMessage = (
              <div className='error-container'>
                  <span>Sorry, your password was incorrect.</span>
              </div>
          );
      }

      return (
        <>
          <div className='form-container sign-in'>
              <h1>Instagram</h1>
              <form onSubmit={this.submit}>
                  <div className='input-container'>
                      <input
                        id='email-phone-username'
                        type='text'
                        placeholder='Phone number, username, or email'
                        onChange={this.handleUserNameChange}
                        value={username}
                      />
                  </div>
                  <div className='input-container'>
                      <input
                        id='password'
                        type='password'
                        placeholder='Password'
                        onChange={this.handlePasswordChange}
                      />
                      {
                        showBtnInPasswordInput
                        ? <button className='show-hide-btn'> {isShowingPassword ? 'Hide' : 'Show'}</button> :
                         null
                       }
                  </div>
                  <div className='submit-container'>
                      {username
                          ? <input type='submit' className='submit-button' value='Log In' />
                          : <input type='submit' className='submit-button-disable' value='Log In' disabled />
                      }
                  </div>
                  {errorMessage}
              </form>
          </div>
          <div className='form-container'>
              <p>Don't have an account? <button onClick={toggleUserForm} className='footer-btn'>Sign up</button></p>
          </div>
        </>
      );
    }
}

export default withRouter(SignIn);
