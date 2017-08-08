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
//import ItemsPrtg from '../api/prtg';
import PrtgSensors from './components/PrtgSensors';
import { Mongo } from 'meteor/mongo';
import { dbSearch} from './actions/prtgActions';


const ItemsPrtg = new Mongo.Collection('itemsprtg');
// initializes the state

// formation redux expects store next action. THis is middle I created that logs.. stuff


// uses combineReducers as redux otherwise can only take one reducer
store.subscribe(() => {
  console.log("Store Updated", store.getState());
});



@autobind
 class AppPrtgSensors extends Component {
   constructor() {
     super();
     this.state = {
       greeting: "",
       dbSearch: {noData:"noData"}
     }
   }

   componentWillMount() {
      this.setState({
        greeting: "Welome to the PRTG App"
      });
    }

    dbSearch(name){
      let data = ItemsPrtg.find().count()
      this.setState({
        dbSearch: data,
      });
    }

  render() {
    //console.log(Session.get("apicResponse")[0]);
    console.log(this);
    if (!this.props.ready) {
      return <div>Loading PRTG...</div>
    }
//<RestApic  changeTicket={this.changeTicket.bind(this)} makeReady={this.makeReady.bind(this)}/>
    console.log(ItemsPrtg.find().count())
    return (
      <Provider store={store}>
        <main>
          <IsRole role={['admin']} {... this.props}>
            <button onClick={this.showAll}>
              Show {this.props.showAll ? 'None': 'All'}
            </button>
          </IsRole>
          <Header  {... this.state} dbSearch= {this.dbSearch.bind(this)} />
          <PrtgSensors {... this.props}/>
        </main>
      </Provider>
    );
  }
}

const mapSateToProps = (state) => {
  return {
    util: state.utilReducer,
    prtg: state.prtgReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dbSearch: (name) => {
      dispatch(hostName(name));
    },
  };
};


export default createContainer(({params}) => {
  let userSub = Meteor.subscribe('currentUser');
  let showAll = Session.get('showAll');
  let prtgItemsSub = Meteor.subscribe('prtgDeviceList');
  let prtgArray = Session.get('myMethodResult');
  let mongoReady = () =>{
    if (ItemsPrtg.find().count() >= 1) {
      console.log("TRUE HIT", ItemsPrtg);
      return true;
    } else {
      console.log("FASE HIT");
      return false;
    }
  }

  return {
    showAll,
    ready: prtgItemsSub.ready() && mongoReady(),
  };
}, AppPrtgSensors);
