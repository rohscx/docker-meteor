import React from 'react';
import {
  HashRouter as Router,
  Route,
  IndexRoute,
  browserHistory
} from 'react-router-dom';
import { render } from 'react-dom';
import App from './App';
import MainLayout from './layouts/MainLayout';
import About from './pages/About';
import AppApic from './AppApic';
import AppIse from './AppIse';
import AppPrtgSensors from './AppPrtgSensors';
import AppTransferRate from './AppTransferRate';


Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout} >
        <IndexRoute component={App} />
        <Route path="/apic" component={AppApic} />
        <Route path="/ise" component={AppIse} />
        <Route path="/prtg" component={AppPrtgSensors} />
        <Route path="/trfr" component={AppTransferRate} />
        <Route path="/about" component={About} />
        <Route path="/:id" component={App} />
      </Route>
    </Router>,
    document.getElementById('render-target')
  );
});
