import * as React from 'react';
import './style.scss';

interface State {
    username: string,
    password: string
}

interface Event {
    target: { value: string }
}

class SignInForm extends React.Component<Object, State>{
    constructor(props: Object) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }
    }

    handleUserNameChange = (e: Event) => {
        this.setState({ username: e.target.value })
    }

    handlePasswordChange = (e: Event) => {
        this.setState({ password: e.target.value })
    }

    render() {
        return (
            <div className="form-container">
                <h1>Instagram</h1>
                <div>
                    <form>
                        <div className="input-container">
                            <input type="text" placeholder="Phone number, username, or email" value={this.state.username}
                                onChange={this.handleUserNameChange} />
                        </div>

                        <div className="input-container">
                            <input type="password" placeholder="Password" value={this.state.password}
                                onChange={this.handlePasswordChange}
                            />
                        </div>

                        <div className="input-container">
                            <input type="submit" />
                        </div>

                    </form>
                </div>

            </div>
        )
    }

}

export default SignInForm;
