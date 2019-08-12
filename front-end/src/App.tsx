import React from 'react';
import UserForm from './components/UserForm';
import SignInForm from './components/signInForm';

import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <SignInForm />
    </div>
  );
}

export default App;
