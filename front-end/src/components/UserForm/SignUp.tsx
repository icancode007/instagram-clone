import React from 'react';

interface UserForm {
  toggleUserForm: any
}

const SignUp = ({ toggleUserForm }: UserForm): JSX.Element => (
  <div>
    <div className="form-container">
      <h1>Instagram</h1>
      <div className="sign-up-top-paragraph-container">
        <p>Sign up to see photos and videos from your friends.</p>
      </div>
      <div>
        <form>
          <div className="input-container">
            <input type="text" placeholder="Mobile number or email" />
          </div>
          <div className="input-container">
            <input type="text" placeholder="Full Name" />
          </div>
          <div className="input-container">
            <input type="text" placeholder="Username" />
          </div>
          <div className="input-container">
            <input type="password" placeholder="Password" />
          </div>
          <div className="submit-container">
            <input type="submit" className="submit-button" value="Sign Up" />
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

export default SignUp;
