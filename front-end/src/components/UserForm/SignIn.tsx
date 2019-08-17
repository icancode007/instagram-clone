import React from 'react';

interface UserForm {
    toggleUserForm: any
}

const SignIn = ({ toggleUserForm }: UserForm): JSX.Element => (
    <div>
        <div className="form-container">
            <h1>Instagram</h1>
            <div>
                <form>
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
    </div>
);

export default SignIn;

