import React from 'react';
import errorImg from './assets/error.png';
import { UserFormProps } from './index';

interface State {
  errors: string[],
  numberOfErrors: number,
  showBtnInPasswordInput: boolean,
  isShowingPassword: boolean,
}

class SignUp extends React.Component<UserFormProps, State>{
  state = {
    errors: [''],
    numberOfErrors: 0,
    showBtnInPasswordInput: false,
    isShowingPassword: false,
  }

  togglePassword = () => {
    const passwordInput: any = document.getElementById("password");

    if (passwordInput.type === "password") {
      this.setState({ isShowingPassword: true });
      passwordInput.type = 'text';
    } else {
      this.setState({ isShowingPassword: false });
      passwordInput.type = 'password';
    }
  }

  submit = (event: any): void => {
    event.preventDefault();
    // Elements
    const phoneNumberOrEmail: any = document.getElementById('email-phone');
    const passwordInput: any = document.getElementById("password");
    const userNameInput: any = document.getElementById('username');
    const fullNameInput: any = document.getElementById('full-name');
    // Validation
    const isValidPhoneNumber = this.props.isValidPhoneNumber(phoneNumberOrEmail.value);
    const isValidEmail = this.props.isValidEmail(phoneNumberOrEmail.value);
    const isValidName = this.props.isValidName(fullNameInput.value);
    const isValidUserName = this.props.isValidUserName(userNameInput.value);
    const isValidPassword = this.props.isValidPassword(passwordInput.value);

    const errorReport = {
      'emailOrPhone': { error: !(isValidPhoneNumber || isValidEmail), position: 0 },
      'fullName': { error: !isValidName, position: 1 },
      'username': { error: !isValidUserName, position: 2 },
      'password': { error: !isValidPassword, position: 3 }
    }

    const readyToSubmit = this.targetErrors(errorReport);

    if (readyToSubmit) {
      // TODO: make register request
      alert('ok')
    }
  }

  handlePasswordChange = (event: { target: { value: string } }): void => {
    if (event.target.value) {
      this.setState({ showBtnInPasswordInput: true })
    } else {
      this.setState({ showBtnInPasswordInput: false })
    }
    this.removeErrorImg(3);
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
          updatedErrors[inputPosition] = "";
          updateNumberOfErrors--;
        }

        return { errors: updatedErrors, numberOfErrors: updateNumberOfErrors }
      });
    }
  }

  renderInputWithError = (searchTerm: string): boolean => {
    const { errors } = this.state;
    return errors.includes(searchTerm);
  }

  displayErrorMessage = () => {
    const { numberOfErrors } = this.state;
    if (numberOfErrors > 1) {
      return 'These fields are required.'
    } else if (numberOfErrors === 1) {
      return "This field is required.";
    } else {
      return null;
    }
  }

  render() {
    const { toggleUserForm } = this.props;
    const { isShowingPassword, showBtnInPasswordInput } = this.state;
    return (
      <div>
        <div className="form-container">
          <h1>Instagram</h1>
          <div className="sign-up-top-paragraph-container">
            <p>Sign up to see photos and videos from your friends.</p>
          </div>
          <div>
            <form onSubmit={this.submit} >
              <div className="input-container">
                <input id="email-phone" type="text" className="sign-up-input" placeholder="Mobile number or email" onChange={() => this.removeErrorImg(0)} />
                {this.renderInputWithError('input-0') ? <img className="error-image" src={errorImg} alt="error" /> : null}
              </div>
              <div className="input-container">
                <input id="full-name" type="text" className="sign-up-input" placeholder="Full Name" onChange={() => this.removeErrorImg(1)} />
                {this.renderInputWithError('input-1') ? <img className="error-image" src={errorImg} alt="error" /> : null}
              </div>
              <div className="input-container">
                <input id="username" type="text" className="sign-up-input" placeholder="Username" onChange={() => this.removeErrorImg(2)} />
                {this.renderInputWithError('input-2') ? <img className="error-image" src={errorImg} alt="error" /> : null}
              </div>
              <div className="input-container">
                <input id="password" type="password" className="sign-up-input" placeholder="Password" onChange={this.handlePasswordChange} />
                {this.renderInputWithError('input-3') ? <img className="error-image" src={errorImg} alt="error" /> : null}
                {showBtnInPasswordInput ? <button className="show-hide-btn" onClick={this.togglePassword}> {isShowingPassword ? "Hide" : "Show"}</button> : null}
              </div>
              <div className="submit-container">
                <input type="submit" className="submit-button" value="Sign Up" />
              </div>
              <div className="error-container">
                {
                  this.displayErrorMessage()
                }
              </div>
              <div className="sign-up-bottom-paragraph-container">
                <p>By signing up, you agree to our <span>Terms</span> , <span>Data Policy</span> and <span>Cookies Policy</span>.</p>
              </div>
            </form>
          </div>
        </div>
        <div className="form-container">
          <p>Have an account? <button onClick={() => toggleUserForm('signUp')} className="lg-footer-sign-up-btn">Log In</button></p>
        </div>
      </div>
    );
  }
}

export default SignUp;
