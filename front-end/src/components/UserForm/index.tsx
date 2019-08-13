import * as React from 'react';
import './style.scss';

export default class Counter extends React.Component {
  //could be refactored to functional component if hooks will be used
  componentDidMount() {
    fetch('/root')
      .then(res => res.json())
      .then(data => console.log(data));
  }

  render() {
    // Rendering both forms for now. 
    // We can also create them in two different files and render them here. 
    return (
      <div>
        {/* Log In */}
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

        {/*  Sign up */}
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

      </div>
    );
  }
}
