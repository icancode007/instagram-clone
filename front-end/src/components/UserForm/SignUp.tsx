import React from 'react';
import errorImg from './assets/error.png';
import { isValidPassword } from '../../bll/authoringBll';

interface State {
  username: string,
  emailOrPhoneNumber: string,
  password: string,
  fullName: string,
  errors: string[],
  numberOfErrors: number,
  showBtnInPasswordInput: boolean,
  isShowingPassword: boolean,
}

interface Props {
  toggleUserForm: () => void
}

class SignUp extends React.Component<Props, State>{
  state = {
    username: '',
    emailOrPhoneNumber: '',
    fullName: '',
    password: '',
    errors: [''],
    numberOfErrors: 0,
    showBtnInPasswordInput: false,
    isShowingPassword: false,
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

  submit = async (event: any): Promise<void> => {
    event.preventDefault();

    const { emailOrPhoneNumber, fullName, username, password, } = this.state;
    const postSettings =  {
      method: 'POST',
      body: new URLSearchParams({
        emailOrPhoneNumber,
        fullName,
        username,
        password,
      }),
    }

    if(isValidPassword(password)){
      const res = await fetch('/signUp', postSettings)
      const json = await res.json()
      //TODO handle protected routes from res JWT
    } else {
      console.log('FAILED');
    }
  }

  handleFieldChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget;
    const field = event.currentTarget.getAttribute('data-field');

    switch(field){
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
          this.setState({ showBtnInPasswordInput: true, password: value })
        } else {
          this.setState({ showBtnInPasswordInput: false })
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

  targetErrors = (errorReport: Object): boolean => {
    const errors = [];
    const inputs = Object.values(errorReport);
    let numberOfErrors = 0;

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].error) {
        errors[i] = `input-${i}`;
        numberOfErrors++;
      }
    }

    if (errors.length) {
      this.setState({ errors, numberOfErrors });
      return false;
    }

    return true;
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

        return { errors: updatedErrors, numberOfErrors: updateNumberOfErrors }
      });
    }
  }

  renderInputWithError = (searchTerm: string): boolean => this.state.errors.includes(searchTerm);

  displayErrorMessage = () => {
    const { numberOfErrors } = this.state;
    if (numberOfErrors > 1) {
      return 'These fields are required.'
    } else if (numberOfErrors === 1) {
      return 'This field is required.';
    } else {
      return null;
    }
  }

  renderInputFields(){
    const { isShowingPassword, showBtnInPasswordInput } = this.state;
    const placeholders: any = {
      'emailOrPhoneNumber': 'Mobile number or email',
      'fullName': 'Full Name',
      'username': 'Username',
      'password': 'Password'
    }

    return (
      Object.keys(placeholders).map((field: string, idx: number) => (
        <div className='input-container' key={`key-${idx}`}>
          <input
            id={field}
            key={field+idx}
            type={field === 'password'? 'password' : 'text'}
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
            ? <button className='show-hide-btn' onClick={this.togglePassword}> {isShowingPassword ? 'Hide' : 'Show'}</button>
            : null
          }
        </div>
      ))
    )
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
                <p>By signing up, you agree to our <span>Terms</span> , <span>Data Policy</span> and <span>Cookies Policy</span>.</p>
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

export default SignUp;
