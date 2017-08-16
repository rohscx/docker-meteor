import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import PrimeHostPortInfo from './components/PrimeHostPortInfo';
import { Mongo } from 'meteor/mongo';
import {createContainer} from 'meteor/react-meteor-data';
import React, {Component} from 'react';
import store from './store';
import { Provider } from 'react-redux';
import IsRole from './utilities/IsRole';
import Header from './components/Header';
import { autobind } from 'core-decorators';
//import ItemsPrimeHostPortInfo from '../api/request';




const ItemsPrimeHostPortInfo = new Mongo.Collection('itemprimehostportinfo');
ItemsPrimeHostPortInfo.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

ItemsPrimeHostPortInfo.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});


 class AppAppPrimeHostInfo extends Component {
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
        title: "Host Port Info"
      });
      this.setState({
        greeting: "Welome, Lookup port status"
      });
      this.setState({
        status: ""
      });
    }



  render() {
    //console.log(Session.get("apicResponse")[0]);
    //console.log(this);
    if (!this.props.ready) {
      return <div>Loading Application...</div>
    }


//<RestApic  changeTicket={this.changeTicket.bind(this)} makeReady={this.makeReady.bind(this)}/>
    //console.log(this)
    return (
      <Provider store={store}>
        <main>
          <IsRole role={['admin']} {... this.props}>
            <button onClick={this.showAll}>
              Show {this.props.showAll ? 'None': 'All'}
            </button>
          </IsRole>
          <Header  {... this.state} />
          <PrimeHostPortInfo {... this.props} dbReturnRdy={true}/>
        </main>
      </Provider>
    );
  }
}



export default createContainer(({params}) => {
  let userSub = Meteor.subscribe('currentUser');
  let showAll = Session.get('showAll');
  let primeDevicesItemsSub = Meteor.subscribe('primeHostPortInfo');
  let prtgArray = Session.get('myMethodResult');
  let dbData = ItemsPrimeHostPortInfo.find().fetch()
  dnsLookup = (hostName,callback)=>{
    callback(Meteor.call('getDnsLookup', hostName))
  }
  sortBy = (findValue,sortValue, sortOrder) =>{
    // debug
    //console.log(findValue," ",sortValue," ",sortOrder)
    let keyString = "siteData.dataObj."+sortValue;
    let sortObj = {};
    let keyObj ={};
    keyObj[keyString] = sortOrder
    sortObj["sort"] = keyObj;

    return ItemsPrimeHostPortInfo.find({"hostData.dataObj.normalizeHostName":{$regex: findValue}},sortObj).fetch();
  }
  return {
    showAll,
    ready: primeDevicesItemsSub.ready(),
    dbReturn: function data(findValue,sortValue, sortOrder){
      //debug
      //console.log(sortBy(sortValue, sortOrder))
      return sortBy(findValue,sortValue, sortOrder)
    },
    dnsLookup: function data(hostName,callback){
      return dnsLookup(hostName,callback)
    }

  };
}, AppAppPrimeHostInfo);
