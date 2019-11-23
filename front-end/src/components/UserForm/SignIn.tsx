import React from 'react';
import { isValidPassword } from '../../bll/authoringBll';

export interface State {
    isSubmitButtonEnable: boolean,
    username: string,
    password: string,
    showBtnInPasswordInput: boolean,
    isShowingPassword: boolean,
    error: string
}

interface Props {
  toggleUserForm: () => void
}

class SignIn extends React.Component<Props, State>{
    state = {
        isSubmitButtonEnable: false,
        username: '',
        password: '',
        showBtnInPasswordInput: false,
        isShowingPassword: false,
        error: ''
    }

    handleUserNameChange = (event: { target: { value: string; }; }): void => {
        this.setState({ username: event.target.value })
    }

    submit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();

        const { username, password } = this.state;

       if (isValidPassword(password)) {
          const postSettings = {
            method: 'POST',
            body: new URLSearchParams({
              username, password
            }),
          }
          await fetch('/signIn', postSettings);

        } else {
            // checks where is the error
            if (username) {
                // Then the password is invalid
                this.setState({ error: 'password' })
            } else {
                this.setState({ error: 'username' })
            }
        }
    }

    handlePasswordChange = (event: { target: { value: string } }): void => {
        if (event.target.value) {
            this.setState({
               showBtnInPasswordInput: true,
               password: event.target.value,
              })
        } else {
            this.setState({ showBtnInPasswordInput: false })
        }
    }

    togglePassword = () => {
        const passwordInput: any = document.getElementById('password');

        if (passwordInput.type === 'password') {
            this.setState({ isShowingPassword: true });
            passwordInput.type = 'text';
        } else {
            this.setState({ isShowingPassword: false });
            passwordInput.type = 'password';
        }
    }

  render() {
      const { toggleUserForm } = this.props;
      const { username, isShowingPassword, showBtnInPasswordInput, error } = this.state;
      let errorMessage;

      if (error === 'username') {
          errorMessage = <div className='error-container'><span>The username you entered doesn't belong to an account.</span></div>;
      } else if (error === 'password') {
          errorMessage = <div className='error-container'><span>Sorry, your password was incorrect.</span></div>;
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
                        ? <button className='show-hide-btn' onClick={this.togglePassword}> {isShowingPassword ? 'Hide' : 'Show'}</button> :
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

export default SignIn;
