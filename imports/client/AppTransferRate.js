import React, {Component} from 'react';
import { autobind } from 'core-decorators';
import {createContainer} from 'meteor/react-meteor-data';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import IsRole from './utilities/IsRole';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';
import Header from './components/Header';
import store from './store';
import { Provider } from 'react-redux';
import ItemsApic from '../api/request';
//import ItemsTransferRate from '../api/prtg';
import TransferRate from './components/TransferRate';
import { Mongo } from 'meteor/mongo';



//const ItemsTransferRate = new Mongo.Collection('itemstransferrate');
ItemsTransferRate.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

ItemsTransferRate.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});


 class AppTransferRate extends Component {
   constructor() {
     super();
     this.state = {
       greeting: "",
       dbReturn: [{group:"",device:"",sensor:""}],
       dbReturnRdy: false,
       fileTransferStatus: false
     }
   }

   componentWillMount() {
      this.setState({
        greeting: "Welome to the file transfer circuit mesurement application"
      });
    }


  render() {
    //console.log(Session.get("apicResponse")[0]);
    //console.log(this);
    if (!this.props.ready) {
      return <div>Loading Application...</div>
    }
//<RestApic  changeTicket={this.changeTicket.bind(this)} makeReady={this.makeReady.bind(this)}/>
    return (
      <Provider store={store}>
        <main>
          <IsRole role={['admin']} {... this.props}>
            <button onClick={this.showAll}>
              Show {this.props.showAll ? 'None': 'All'}
            </button>
          </IsRole>
          <Header  {... this.state} />

        </main>
      </Provider>
    );
  }
}



export default createContainer(({params}) => {
  let userSub = Meteor.subscribe('currentUser');
  let showAll = Session.get('showAll');
  let prtgItemsSub = Meteor.subscribe('prtgDeviceList');
  let prtgArray = Session.get('myMethodResult');
  return {
    showAll,
    ready: "REaDy-Bro0"
  };
}, AppTransferRate);