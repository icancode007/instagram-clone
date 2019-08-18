import React from 'react';

interface UserForm {
    toggleUserForm: any
}

class SignIn extends React.Component<UserForm>{

    submit = (e: React.FormEvent): void => {
        e.preventDefault();
    }

    render() {
        const { toggleUserForm } = this.props;
        return (
            <div>
                <div className="form-container">
                    <h1>Instagram</h1>
                    <div>
                        <form onSubmit={this.submit}>
                            <div className="input-container">
                                <input type="text" placeholder="Phone number, username, or email" />
                            </div>
                            <div className="input-container">
                                <input type="password" placeholder="Password" />
                            </div>
                            <div className="submit-container">
                                <input type="submit" className="submit-button" value="Log In" />
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

