import React from 'react';

interface UserForm {
    toggleUserForm: any
}

interface State {
    isSubmitButtonEnable: boolean,
    username: string,
    showBtnInPasswordInput: boolean,
    isShowingPassword: boolean,
}

class SignIn extends React.Component<UserForm, State>{

    state = {
        isSubmitButtonEnable: false,
        username: "",
        showBtnInPasswordInput: false,
        isShowingPassword: false
    }

    handleUserNameChange = (e: { target: { value: string; }; }): void => {
        this.setState({ username: e.target.value })
    }

    submit = (e: React.FormEvent): void => {
        e.preventDefault();
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
        const { username, isShowingPassword, showBtnInPasswordInput } = this.state;

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
                                {showBtnInPasswordInput ? <span className="show-hide-btn" onClick={this.togglePassword}> {isShowingPassword ? "Hide" : "Show"}</span> : null}
                            </div>
                            <div className="submit-container">
                                <input type="submit" className={username ? "submit-button" : "submit-button-disable"} value="Log In" />
                            </div>
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