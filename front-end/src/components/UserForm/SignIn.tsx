import React from 'react';
import { UserFormProps } from './index';

export interface State {
    isSubmitButtonEnable: boolean,
    username: string,
    showBtnInPasswordInput: boolean,
    isShowingPassword: boolean,
    error: string
}

class SignIn extends React.Component<UserFormProps, State>{
    state = {
        isSubmitButtonEnable: false,
        username: "",
        showBtnInPasswordInput: false,
        isShowingPassword: false,
        error: ""
    }

    handleUserNameChange = (event: { target: { value: string; }; }): void => {
        this.setState({ username: event.target.value })
    }

    submit = (event: React.FormEvent): void => {
        event.preventDefault();
        const phoneNumberOrEmail: any = document.getElementById('email-phone-username');
        const passwordInput: any = document.getElementById("password");

        const isValidPhoneNumber = this.props.isValidPhoneNumber(phoneNumberOrEmail.value);
        const isValidEmail = this.props.isValidEmail(phoneNumberOrEmail.value);
        const isValidUserName = this.props.isValidUserName(phoneNumberOrEmail.value);
        const isValidInput = isValidEmail || isValidPhoneNumber || isValidUserName;
        const isValidPassword = this.props.isValidPassword(passwordInput.value);

        if (isValidInput && isValidPassword) {
            // TODO: make logging request
        } else {
            // checks where is the error
            if (isValidInput) {
                // Then the password is invalid
                this.setState({ error: "password" })
            } else {
                this.setState({ error: "username" })
            }
        }
    }

    handlePasswordChange = (event: { target: { value: string } }): void => {
        if (event.target.value) {
            this.setState({ showBtnInPasswordInput: true })
        } else {
            this.setState({ showBtnInPasswordInput: false })
        }
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

    render() {
        const { toggleUserForm } = this.props;
        const { username, isShowingPassword, showBtnInPasswordInput, error } = this.state;
        let errorMessage;

        if (error === "username") {
            errorMessage = <div className="error-container"><span>The username you entered doesn't belong to an account.</span></div>;
        } else if (error === "password") {
            errorMessage = <div className="error-container"><span>Sorry, your password was incorrect.</span></div>;
        }

        return (
            <div>
                <div className="form-container sign-in">
                    <h1>Instagram</h1>
                    <div>
                        <form onSubmit={this.submit}>
                            <div className="input-container">
                                <input id="email-phone-username" type="text" placeholder="Phone number, username, or email" onChange={this.handleUserNameChange} value={username} />
                            </div>
                            <div className="input-container">
                                <input id="password" type="password" placeholder="Password" onChange={this.handlePasswordChange} />
                                {showBtnInPasswordInput ? <button className="show-hide-btn" onClick={this.togglePassword}> {isShowingPassword ? "Hide" : "Show"}</button> : null}
                            </div>
                            <div className="submit-container">
                                {username
                                    ? <input type="submit" className="submit-button" value="Log In" />
                                    : <input type="submit" className="submit-button-disable" value="Log In" disabled />
                                }
                            </div>
                            {errorMessage}
                        </form>
                    </div>
                </div>
                <div className="form-container">
                    <p>Don't have an account? <button onClick={toggleUserForm} className="footer-btn">Sign up</button></p>
                </div>
            </div>);
    }
}

export default SignIn;