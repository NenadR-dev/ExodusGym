import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './configure-store'
import {Router, Switch, Route, Redirect} from 'react-router-dom'
import { HomepageComponent } from './components/homepage-component';
import {createBrowserHistory} from 'history'
import RegisterComponent from './components/register-component';

const store = configureStore()
const hist = createBrowserHistory()

ReactDOM.render(
    <Provider store={store}>
      <Router history={hist}>
        <Switch>
          <Route path="/home" render={props=> <HomepageComponent />} />
          <Redirect from="/" to="/home"/>
        </Switch>
      </Router>
    </Provider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
