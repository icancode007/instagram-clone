import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import errorImg from './assets/error.png';

interface State {
  username: string;
  emailOrPhoneNumber: string;
  password: string;
  fullName: string;
  errors: string[];
  numberOfErrors: number;
  showBtnInPasswordInput: boolean;
  isShowingPassword: boolean;
}

interface Props extends RouteComponentProps {
  toggleUserForm: () => void;
  signUp: any;
}

class SignUp extends Component<Props, State> {
   state = {
    emailOrPhoneNumber: '',
    errors: [''],
    fullName: '',
    isShowingPassword: false,
    numberOfErrors: 0,
    password: '',
    showBtnInPasswordInput: false,
    username: '',
  };

   submit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    const { emailOrPhoneNumber, fullName, username, password, } = this.state;
    const submitRes = await this.props.signUp({ emailOrPhoneNumber, fullName, username, password });

    if (!Object.prototype.hasOwnProperty('error') && submitRes.data.success) {
        this.props.history.push(`/${username}`);
    }
  }

   handleFieldChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget;
    const field = event.currentTarget.getAttribute('data-field');

    switch (field) {
      case 'username':
        this.setState({ username: value });
        this.removeErrorImg(2);
        break;
      case 'emailOrPhoneNumber':
        this.setState({ emailOrPhoneNumber: value });
        this.removeErrorImg(0);
        break;
      case 'password':
        if (value) {
          this.setState({ showBtnInPasswordInput: true, password: value });
        } else {
          this.setState({ showBtnInPasswordInput: false });
        }
        this.removeErrorImg(3);
        break;
      case 'fullName':
        this.setState({ fullName: value });
        this.removeErrorImg(1);
        break;
      default:
        break;
    }
  }

   removeErrorImg = (inputPosition: number): void => {
    if (this.state.errors.length) {

      this.setState((prevState) => {
        const updatedErrors = prevState.errors;
        let updateNumberOfErrors = prevState.numberOfErrors;

        if (updatedErrors[inputPosition]) {
          updatedErrors[inputPosition] = '';
          updateNumberOfErrors--;
        }

        return { errors: updatedErrors, numberOfErrors: updateNumberOfErrors };
      });
    }
  }

   renderInputWithError = (searchTerm: string): boolean => this.state.errors.includes(searchTerm);

   displayErrorMessage = () => {
    const { numberOfErrors } = this.state;
    if (numberOfErrors > 1) {
      return 'These fields are required.';
    } else if (numberOfErrors === 1) {
      return 'This field is required.';
    } else {
      return null;
    }
  }

   renderInputFields() {
    const { isShowingPassword, showBtnInPasswordInput } = this.state;
    const placeholders: any = {
      emailOrPhoneNumber: 'Mobile number or email',
      fullName: 'Full Name',
      password: 'Password',
      username: 'Username',
    };

    return (
      Object.keys(placeholders).map((field: string, idx: number) => (
        <div className='input-container' key={`key-${idx}`}>
          <input
            id={field}
            key={field + idx}
            type={field === 'password' ? 'password' : 'text'}
            className='sign-up-input'
            placeholder={placeholders[field]}
            onChange={this.handleFieldChange}
            data-field={field}
          />
          {
            this.renderInputWithError(`input-${idx}`)
            ? <img className='error-image' src={errorImg} alt='error' />
            : null
          }
          {
            showBtnInPasswordInput && field === 'password'
            ? <button className='show-hide-btn'>
                    {isShowingPassword ? 'Hide' : 'Show'}
              </button>
            : null
          }
        </div>
      ))
    );
  }

   render() {
    const { toggleUserForm } = this.props;
    return (
      <>
        <div className='form-container sign-up'>
          <h1>Instagram</h1>
          <div className='sign-up-top-paragraph-container'>
            <p>Sign up to see photos and videos from your friends.</p>
          </div>
          <div>
            <form onSubmit={this.submit} >
                {this.renderInputFields()}
              <div className='submit-container'>
                <input type='submit' className='submit-button' value='Sign Up' />
              </div>
              <div className='error-container'>
                {this.displayErrorMessage()}
              </div>
              <div className='sign-up-bottom-paragraph-container'>
                <p> By signing up, you agree to our
                    <span>Terms, Data Policy and Cookies Policy .</span>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className='form-container'>
          <p>Have an account? <button onClick={toggleUserForm} className='footer-btn'>Log In</button></p>
        </div>
      </>
    );
  }
}

export default withRouter(SignUp);
