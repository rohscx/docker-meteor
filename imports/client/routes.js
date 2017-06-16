import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory
} from 'react-router';
import { render } from 'react-dom';
import App from './App';
import MainLayout from './layouts/MainLayout';
import About from './pages/About';

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout} >
        <IndexRoute component={App} />
        <Route path="/about" component={About} />
      </Route>
    </Router>,
    document.getElementById('render-target')
  );
});
