import React from 'react';

interface UserForm {
    toggleUserForm: any
}

interface State {
    isSubmitButtonEnable: boolean,
    username: string,
}

class SignIn extends React.Component<UserForm, State>{

    state = {
        isSubmitButtonEnable: false,
        username: ""
    }

    handleUserNameChange = (e: { target: { value: string; }; }) => {
        this.setState({ username: e.target.value })
    }

    submit = (e: React.FormEvent): void => {
        e.preventDefault();
    }

    render() {
        const { toggleUserForm } = this.props;
        const { username } = this.state;

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
                                <input type="password" placeholder="Password" />
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