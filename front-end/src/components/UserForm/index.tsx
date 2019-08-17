import * as React from 'react';
import './style.scss';
import SignUp from './SignUp';
import SignIn from './SignIn';

interface State {
  isSigningIn: boolean,
}

export default class Counter extends React.Component<Object, State> {
  //could be refactored to functional component if hooks will be used
  state = {
    isSigningIn: false
  }

  componentDidMount(): void {
    fetch('/root')
      .then(res => res.json())
      .then(data => console.log(data));
  }

  toggleUserForm = (origin: string): void => {
    origin === 'signUp'
      ? this.setState({ isSigningIn: true })
      : this.setState({ isSigningIn: false })

  }

  render(): JSX.Element {
    const { isSigningIn } = this.state;
    return isSigningIn ? <SignIn toggleUserForm={this.toggleUserForm} /> : <SignUp toggleUserForm={this.toggleUserForm} />
  }
}
