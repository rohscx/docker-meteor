import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import ApicDevices from './components/ApicDevices';
import { Mongo } from 'meteor/mongo';
import {createContainer} from 'meteor/react-meteor-data';
import React, {Component} from 'react';
import store from './store';
import { Provider } from 'react-redux';
import ItemsApic from '../api/request';
import IsRole from './utilities/IsRole';
import Header from './components/Header';
import { autobind } from 'core-decorators';
//import ItemsApicDevices from '../api/prtg';




const ItemsApicDevices = new Mongo.Collection('itemapicdevices');
ItemsApicDevices.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

ItemsApicDevices.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});


 class AppApicDevices extends Component {
   constructor() {
     super();
     this.state = {
       title: "",
       greeting:"",
       status: "",
       dbReturnRdy: true,
       fileTransferStatus: false
     }
   }

   componentWillMount() {

      this.setState({
        title: "Cisco Network Device Information"
      });
      this.setState({
        greeting: "Welome, this application returns the general status of all Cisco network devices connected to Apic-EM"
      });
      this.setState({
        status: ""
      });
    }



  render() {
    //console.log(Session.get("apicResponse")[0]);
    console.log(this);
    if (!this.props.ready) {
      return <div>Loading Application...</div>
    }


//<RestApic  changeTicket={this.changeTicket.bind(this)} makeReady={this.makeReady.bind(this)}/>
    console.log(this)
    return (
      <Provider store={store}>
        <main>
          <IsRole role={['admin']} {... this.props}>
            <button onClick={this.showAll}>
              Show {this.props.showAll ? 'None': 'All'}
            </button>
          </IsRole>
          <Header  {... this.state} />
          <ApicDevices {... this.props} dbReturnRdy={true}/>
        </main>
      </Provider>
    );
  }
}



export default createContainer(({params}) => {
  let userSub = Meteor.subscribe('currentUser');
  let showAll = Session.get('showAll');
  let apicDevicesItemsSub = Meteor.subscribe('apicDevices');
  let prtgArray = Session.get('myMethodResult');
  let dbData = ItemsApicDevices.find().fetch()
  sortBy = (findValue,sortValue, sortOrder) =>{
    // debug
    //console.log(findValue," ",sortValue," ",sortOrder)
    let keyString = "siteData.dataObj."+sortValue;
    let sortObj = {};
    let keyObj ={};
    keyObj[keyString] = sortOrder
    sortObj["sort"] = keyObj;
    // debug
    //console.log(sortObj)
    return ItemsApicDevices.find({"siteData.dataObj.normalizeHostName":{$regex: findValue}},sortObj).fetch();
  }
  return {
    showAll,
    ready: apicDevicesItemsSub.ready(),
    dbReturn: function data(findValue,sortValue, sortOrder){
      //debug
      //console.log(sortBy(sortValue, sortOrder))
      return sortBy(findValue,sortValue, sortOrder)
    },test: userSub

  };
}, AppApicDevices);
