import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserForm from './components/UserForm';
import MyFeed from './components/MyFeed';
import './App.scss';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <UserForm />
          </Route>
          <Route path="/myfeed">
            <MyFeed />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
