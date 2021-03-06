import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import WebServerStatus from './components/WebServerStatus';
import { Mongo } from 'meteor/mongo';
import {withTracker} from 'meteor/react-meteor-data';
import React, {Component} from 'react';
import store from './store';
import { Provider } from 'react-redux';
import IsRole from './utilities/IsRole';
import Header from './components/Header';



const ItemsWebServerStatus = new Mongo.Collection('itemswebserverstatus');
ItemsWebServerStatus.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

ItemsWebServerStatus.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});


 class AppWebServerStatus extends Component {
   constructor() {
     super();
     this.state = {
       title: "",
       greeting:"",
       status: "",
       dbReturnRdy: true,
       dbFindLimit: 5,
       fileTransferStatus: false,
     }
   }

   componentWillMount() {

      this.setState({
        title: "Webserver Status"
      });
      this.setState({
        greeting: "Welome, this application returns the general status for the displayed WebServers"
      });
      this.setState({
        status: ""
      });
    }

    setDbFindLimit (data) {
      this.setState({dbFindLimit:data})
    }

  render() {
    //console.log(Session.get("apicResponse")[0]);
    console.log(this);
    if (!this.props.ready) {
      return <div>Loading Application...</div>
    }
    return (
      <Provider store={store}>
        <main>
          <Header  {... this.state} />
          <WebServerStatus {... this.props} dbReturnRdy={true} dbFindLimit={this.state.dbFindLimit} setDbFindLimit={this.setDbFindLimit.bind(this)} className="container-fluid" />
        </main>
      </Provider>
    );
  }
}



export default withTracker(({params}) => {
  let userSub = Meteor.subscribe('currentUser');
  let showAll = Session.get('showAll');
  let meteorDbSub = Meteor.subscribe('webServerStatus');
  let dbData = ItemsWebServerStatus.find().fetch();
  console.log("dbData",dbData)
  sortBy = (findValue,sortValue,sortOrder,findLimit) =>{
    // debug
    //console.log(findValue," ",sortValue," ",sortOrder)
    let keyString = "webServerData.dataObj."+sortValue;
    let optObj = {};
    let keyObj ={};
    keyObj[keyString] = sortOrder
    optObj["sort"] = keyObj;
    optObj["limit"] = findLimit;
    // debug
    //console.log(optObj);
    return ItemsWebServerStatus.find({"webServerData.dataObj.name":{$regex: findValue}},optObj).fetch();
  }
  return {
    showAll,
    ready: meteorDbSub.ready(),
    dbReturn: function data(findValue,sortValue,sortOrder,findLimit){
      //debug
      //console.log(sortBy(sortValue, sortOrder))
      return sortBy(findValue,sortValue,sortOrder,findLimit)
    }

  };
})(AppWebServerStatus);
