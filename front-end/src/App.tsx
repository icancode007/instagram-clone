import jwt from 'jsonwebtoken';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { authenticateUser } from './actions/authUser';
import './App.scss';
import IgContainer from './components/IgContainer';
import MyFeed from './components/MyFeed';
import UserForm from './components/UserForm';
import root from './reducers/root';
import setAuthorizationToken from './utils/setAuthorizationToken';

const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;



const store = createStore(root, composeEnhancers(applyMiddleware(thunk)));

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(authenticateUser(jwt.decode(localStorage.jwtToken)));
}

const App: React.FC = () => (
  <Provider store={store}>
    <IgContainer>
      <Router>
        <Switch>
          <Route exact path='/' component={UserForm} />
          <Route exact path='/:user' component={MyFeed} />
        </Switch>
      </Router>
    </IgContainer>
  </Provider>
);
export default App;
