import React from 'react';
import errorImg from './assets/error.png';

export interface UserForm {
  toggleUserForm: any
}

interface State {
  errors: string[],
  numberOfErrors: number
}

class SignUp extends React.Component<UserForm, State>{
  state = {
    errors: [''],
    numberOfErrors: 0
  }

  submit = (event: any): void => {
    event.preventDefault();
    let inputChildren = document.querySelectorAll('.sign-up-input');
    let errors: string[] = [];


    for (let i = 0; i < inputChildren.length; i++) {
      const input: any = inputChildren[i];

      if (!input.value) {

        input.onfocus = () => {
          this.setState((prevState) => {
            const updatedNumberOfErrors = prevState.numberOfErrors - 1;
            const updatedErrors = prevState.errors;
            updatedErrors[i] = "";
            return { errors: updatedErrors, numberOfErrors: updatedNumberOfErrors }
          });
        }

        errors[i] = `input-${i}`;
      }
    }

    if (errors.length) {
      this.setState({ errors, numberOfErrors: errors.length })
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
                <input type="text" className="sign-up-input" placeholder="Mobile number or email" />
                {this.renderInputWithError('input-0') ? <img className="error-image" src={errorImg} alt="error" /> : null}
              </div>
              <div className="input-container">
                <input type="text" className="sign-up-input" placeholder="Full Name" />
                {this.renderInputWithError('input-1') ? <img className="error-image" src={errorImg} alt="error" /> : null}
              </div>
              <div className="input-container">
                <input type="text" className="sign-up-input" placeholder="Username" />
                {this.renderInputWithError('input-2') ? <img className="error-image" src={errorImg} alt="error" /> : null}
              </div>
              <div className="input-container">
                <input type="text" className="sign-up-input" placeholder="Password" />
                {this.renderInputWithError('input-3') ? <img className="error-image" src={errorImg} alt="error" /> : null}
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
