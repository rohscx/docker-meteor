import React, {Component} from 'react';
import { autobind } from 'core-decorators';
import {withTracker} from 'meteor/react-meteor-data';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import IsRole from './utilities/IsRole';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';
import Header from './components/Header';
import store from './store';
import { Provider } from 'react-redux';
import ItemsApic from '../api/request';
//import ItemsPrtg from '../api/prtg';
import PrtgSensors from './components/PrtgSensors';
import { Mongo } from 'meteor/mongo';


const ItemsPrtg = new Mongo.Collection('itemsprtg');
ItemsPrtg.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

ItemsPrtg.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});


// uses combineReducers as redux otherwise can only take one reducer
/*
store.subscribe(() => {
  console.log("Store Updated", store.getState());
});
*/


@autobind
 class AppPrtgSensors extends Component {
   constructor() {
     super();
     this.state = {
       title: "",
       greeting:"",
       status: "",
       dbReturn: [{group:"",device:"",sensor:""}],
       dbReturnRdy: false
     }
   }

   componentWillMount() {
     this.setState({
       title: "Branch Network Status"
     });
     this.setState({
       greeting: "Welome, this applicaiton privides the status of network equipment in a branch..."
     });
     this.setState({
       status: ""
     });
    }

    dbSearch(name){
      let ex = ".*"+name+".*";
      let data = ItemsPrtg.find({"prtgData.dataObj.device":{$regex: ex}},{sort:{"prtgData.dataObj.group": 1,"prtgData.dataObj.device": 1}}).fetch();
      this.setState({
        dbReturn: data,
      });
      if (ex.length <= 4){
        // debug
        //console.log("false",ex.length)
        this.setState({
          dbReturnRdy: false,
        });
      } else {
        // debug
        //console.log("true",ex.length)
        this.setState({
          dbReturnRdy: true,
        });
      }
    }

  render() {
    //console.log(Session.get("apicResponse")[0]);
    //console.log(this);
    if (!this.props.ready) {
      return <div>Loading PRTG...</div>
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
          <PrtgSensors {... this.state} dbSearch= {this.dbSearch.bind(this)}/>
        </main>
      </Provider>
    );
  }
}




export default withTracker(({params}) => {
  let userSub = Meteor.subscribe('currentUser');
  let showAll = Session.get('showAll');
  let prtgItemsSub = Meteor.subscribe('prtgDeviceList');
  let prtgArray = Session.get('myMethodResult');
  let mongoReady = () =>{
    if (ItemsPrtg.find().count() >= 1) {
      // debug
      //console.log("TRUE HIT", prtgItemsSub.ready());
      return true;
    } else {
      // debug
      //console.log("FASE HIT");
      return false;
    }
  }

  return {
    showAll,
    ready: prtgItemsSub.ready() && mongoReady(),
    dbReturn: prtgItemsSub
  };
})(AppPrtgSensors);
