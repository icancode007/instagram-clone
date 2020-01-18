import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import './App.scss';
import MyFeed from './components/MyFeed';
import UserForm from './components/UserForm';
import root from './reducers/root';

const store = createStore(
  root,
  applyMiddleware(thunk)
);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Switch>
            <Route exact path='/'>
              <UserForm />
            </Route>
            <Route path='/myfeed'>
              <MyFeed />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
