import React from 'react';
import PropTypes from 'prop-types';
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
import AppApicDevices from './AppApicDevices';
import AppTransferRate from './AppTransferRate';
import AppWebServerStatus from './AppWebServerStatus';


Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout} >
        <IndexRoute component={App} />
        <Route path="/apicdev" component={AppApicDevices} />
        <Route path="/wss" component={AppWebServerStatus} />
        <Route path="/trfr" component={AppTransferRate} />
        <Route path="/about" component={About} />
        <Route path="/:id" component={App} />
      </Route>
    </Router>,
    document.getElementById('render-target')
  );
});
