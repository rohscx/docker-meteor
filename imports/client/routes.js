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
import AppApicDevices from './AppApicDevices';
import AppIse from './AppIse';
import AppPrtgSensors from './AppPrtgSensors';
import AppTransferRate from './AppTransferRate';
import AppPrimeHostPortInfo from './AppPrimeHostPortInfo';
import AppWebServerStatus from './AppWebServerStatus';


Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout} >
        <IndexRoute component={App} />
        <Route path="/apicdev" component={AppApicDevices} />
        <Route path="/wss" component={AppWebServerStatus} />
        <Route path="/ise" component={AppIse} />
        <Route path="/prtg" component={AppPrtgSensors} />
        <Route path="/trfr" component={AppTransferRate} />
        <Route path="/hpi" component={AppPrimeHostPortInfo} />
        <Route path="/about" component={About} />
        <Route path="/:id" component={App} />
      </Route>
    </Router>,
    document.getElementById('render-target')
  );
});
