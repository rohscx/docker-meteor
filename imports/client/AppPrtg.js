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
import ItemsPrtg from '../api/request';


import Prtg from './components/Prtg';

// initializes the state

// formation redux expects store next action. THis is middle I created that logs.. stuff


// uses combineReducers as redux otherwise can only take one reducer


store.subscribe(() => {
  console.log("Store Updated", store.getState());
});



@autobind
 class AppPrtg extends Component {
   constructor() {
     super();
     this.state = {
       greeting: ""
     }
   }


   componentWillMount() {
      this.setState({
        greeting: "Welome to the PRTG App"
      });
    }

  render() {
    //console.log(Session.get("apicResponse")[0]);
    //console.log(this);
    if (!this.props.ready) {
      return <div>Loading PRTG...</div>
    }
//<RestApic  changeTicket={this.changeTicket.bind(this)} makeReady={this.makeReady.bind(this)}/>
    console.log(this);
    return (
      <Provider store={store}>
        <main>
          <IsRole role={['admin']} {... this.props}>
            <button onClick={this.showAll}>
              Show {this.props.showAll ? 'None': 'All'}
            </button>
          </IsRole>
          <Header {... this.state}/>
          <Prtg {... this.state}/>
        </main>
      </Provider>
    );
  }
}


export default createContainer(({params}) => {
  let userSub = Meteor.subscribe('currentUser');
  let showAll = Session.get('showAll');
  let prtgItemsSub = Meteor.subscribe('prtgDeviceList');
  let prtgArray;
  prtgArray = ItemsPrtg.find()
  console.log(ItemsPrtg.find())
  return {
    showAll,
    ready: prtgItemsSub.ready(),
    prtgItems: prtgArray
  }
}, AppPrtg);
