import React from 'react';

interface UserForm {
    toggleUserForm: any
}

interface State {
    isSubmitButtonEnable: boolean,
    username: string,
    showBtnInPasswordInput: boolean,
    isShowingPassword: boolean,
    isError: boolean
}

class SignIn extends React.Component<UserForm, State>{
    state = {
        isSubmitButtonEnable: false,
        username: "",
        showBtnInPasswordInput: false,
        isShowingPassword: false,
        isError: false
    }

    handleUserNameChange = (event: { target: { value: string; }; }): void => {
        this.setState({ username: event.target.value })
    }

    submit = (event: React.FormEvent): void => {
        event.preventDefault();
        const passwordInput: any = document.getElementById("passwordInput");

        if (passwordInput.value) {
            // do sign in request
        } else {
            this.setState({ isError: true })
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
        const passwordInput: any = document.getElementById("passwordInput");

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
        const { username, isShowingPassword, showBtnInPasswordInput, isError } = this.state;

        return (
            <div>
                <div className="form-container">
                    <h1>Instagram</h1>
                    <div>
                        <form onSubmit={this.submit}>
                            <div className="input-container">
                                <input type="text" placeholder="Phone number, username, or email" onChange={this.handleUserNameChange} value={username} />
                            </div>
                            <div className="input-container">
                                <input id="passwordInput" type="password" placeholder="Password" onChange={this.handlePasswordChange} />
                                {showBtnInPasswordInput ? <button className="show-hide-btn" onClick={this.togglePassword}> {isShowingPassword ? "Hide" : "Show"}</button> : null}
                            </div>
                            <div className="submit-container">
                                {username
                                    ? <input type="submit" className="submit-button" value="Log In" />
                                    : <input type="submit" className="submit-button-disable" value="Log In" disabled />
                                }
                            </div>
                            {
                             isError
                               ? <div className="error-container"> <span>password is required</span></div>
                               : null
                            }
                        </form>
                    </div>
                </div>
                <div className="form-container">
                    <p>Don't have an account? <button onClick={toggleUserForm} className="lg-footer-sign-up-btn">Sign up</button></p>
                </div>
            </div>);
    }
}

export default SignIn;