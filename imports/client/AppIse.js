import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import { autobind } from 'core-decorators';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import IsRole from './utilities/IsRole';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';
import Header from './components/Header';
import store from './store';
import { Provider } from 'react-redux';


import Ise from './components/Ise';

// initializes the state

// formation redux expects store next action. THis is middle I created that logs.. stuff


// uses combineReducers as redux otherwise can only take one reducer


// uses combineReducers as redux otherwise can only take one reducer
/*
store.subscribe(() => {
  console.log("Store Updated", store.getState());
});
*/



@autobind
 class AppIse extends Component {
   constructor() {
     super();
     this.state = {
       greeting: ""
     }
   }


   componentWillMount() {
      this.setState({
        greeting: "Welome to the ISE App"
      });
    }

  render() {
    //console.log(Session.get("apicResponse")[0]);
    //console.log(this);
    if (!this.props.ready) {
      return <div>Loading ISE...</div>
    }
//<RestApic  changeTicket={this.changeTicket.bind(this)} makeReady={this.makeReady.bind(this)}/>
    //console.log(this);
    return (
      <Provider store={store}>
        <main>
          <IsRole role={['admin']} {... this.props}>
            <button onClick={this.showAll}>
              Show {this.props.showAll ? 'None': 'All'}
            </button>
          </IsRole>
          <Header {... this.state}/>
          <Ise {... this.state}/>
        </main>
      </Provider>
    );
  }
}


<<<<<<< HEAD
export default withTracker( props => {
=======
export default createContainer(({params}) => {
>>>>>>> parent of e74cd4a... replaced createContainer with withTracker
  let userSub = Meteor.subscribe('currentUser');
  let showAll = Session.get('showAll');
  return {
    showAll,
    ready: "k",
  }
})(AppIse);
