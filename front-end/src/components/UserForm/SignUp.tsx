import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

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
  signUp: Function;
}

class SignUp extends Component<Props, State> {
  state: State = {
    username: '',
    emailOrPhoneNumber: '',
    password: '',
    fullName: '',
    errors: [''],
    numberOfErrors: 0,
    showBtnInPasswordInput: false,
    isShowingPassword: false,
  };

  submit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    const { emailOrPhoneNumber, fullName, username, password } = this.state;
    const { signUp, history } = this.props;

    const submitRes = await signUp({
      emailOrPhoneNumber,
      fullName,
      username,
      password,
    });

    if (!submitRes.error && submitRes.data) {
      history.push(`/${username}`);
    }
  };

  handleFieldChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget;
    const field = event.currentTarget.getAttribute('data-field') as any;

    if (field !== 'password') {
     return this.setState({[field]: value} as Pick<State, keyof State>)
    }

    const setPwd = value
      ? { showBtnInPasswordInput: true, password: value }
      : { showBtnInPasswordInput: false } as Pick<State, keyof State>;

    return this.setState(setPwd)
  };

  removeErrorImg = (inputPosition: number): void => {
    const { errors } = this.state;

    if (errors.length) {
      this.setState((prevState) => {
        const updatedErrors = prevState.errors;
        let updateNumberOfErrors = prevState.numberOfErrors;

        if (updatedErrors[inputPosition]) {
          updatedErrors[inputPosition] = '';
          updateNumberOfErrors -= 1;
        }

        return { errors: updatedErrors, numberOfErrors: updateNumberOfErrors };
      });
    }
  };

  renderInputWithError = (searchTerm: string): boolean => {
    const { errors } = this.state;
    return errors.includes(searchTerm);
  };

  displayErrorMessage = () => {
    const { numberOfErrors } = this.state;
    if (numberOfErrors > 1) {
      return 'These fields are required.';
    }
    if (numberOfErrors === 1) {
      return 'This field is required.';
    }
    return null;
  };

  hideDisplayPassword = () => {
    this.setState((state) => {
      return {isShowingPassword: !state.isShowingPassword}
    })
  }

  renderInputFields = (): JSX.Element[] => {
    const { isShowingPassword, showBtnInPasswordInput } = this.state;
    const placeholders: { [key: string]: string } = {
      emailOrPhoneNumber: 'Mobile number or email',
      fullName: 'Full Name',
      password: 'Password',
      username: 'Username',
    };

    return Object.keys(placeholders).map((field: string, idx: number) => (
      <div className='input-container' key={`key-${idx}`}>
        <input
          id={field}
          key={field + idx}
          type={field === 'password' && !isShowingPassword ? 'password': 'text'}
          className='sign-up-input'
          placeholder={placeholders[field]}
          onChange={this.handleFieldChange}
          data-field={field}
        />
        {this.renderInputWithError(`input-${idx}`) ? (
          <img className='error-image' src={`${process.env.PUBLIC_URL} + /error.png`} alt='error' />
        ) : null}
        {showBtnInPasswordInput && field === 'password' ? (
          <button className='show-hide-btn' type='button' onClick={this.hideDisplayPassword}>
            {isShowingPassword ? 'Hide' : 'Show'}
          </button>
        ) : null}
      </div>
    ));
  }

  render() {
    const {
      props: { toggleUserForm },
      renderInputFields,
      displayErrorMessage,
    } = this;
    return (
      <>
        <div className='form-container sign-up'>
          <h1>Instagram</h1>
          <div className='sign-up-top-paragraph-container'>
            <p>Sign up to see photos and videos from your friends.</p>
          </div>
          <div>
            <form onSubmit={this.submit}>
              {renderInputFields()}
              <div className='submit-container'>
                <input
                  type='submit'
                  className='submit-button'
                  value='Sign Up'
                />
              </div>
              <div className='error-container'>{displayErrorMessage()}</div>
              <div className='sign-up-bottom-paragraph-container'>
                <p>
                  By signing up, you agree to our
                  <span>Terms, Data Policy and Cookies Policy .</span>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className='form-container'>
          <p>
            Have an account?
            <button
              type='button'
              onClick={toggleUserForm}
              className='footer-btn'
            >
              Log In
            </button>
          </p>
        </div>
      </>
    );
  }
}

export default withRouter(SignUp);
