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

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout} >
        <Route path="/" component={App} />
      </Route>
    </Router>,
    document.getElementById('render-target')
  );
});
