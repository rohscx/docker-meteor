import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import TransferRate from './components/TransferRate';
import { Mongo } from 'meteor/mongo';
import { withTracker } from 'meteor/react-meteor-data';
import React, {Component} from 'react';
import store from './store';
import { Provider } from 'react-redux';
import ItemsApic from '../api/request';
import IsRole from './utilities/IsRole';
import Header from './components/Header';
import { autobind } from 'core-decorators';
//import ItemsTransferRate from '../api/prtg';




const ItemsTransferRate = new Mongo.Collection('itemstransferrate');
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
       title: "",
       greeting:"",
       status: "",
       dbReturnRdy: true,
       fileTransferStatus: false
     }
   }

   componentWillMount() {

      this.setState({
        title: "File Transfer Time Calculator"
      });
      this.setState({
        greeting: "Welome, this application calculates the time it will take to move a file... 59Hours or less will be Green."
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
          <TransferRate {... this.props} dbReturnRdy={true}/>
        </main>
      </Provider>
    );
  }
}



export default withTracker(({params}) => {
  let userSub = Meteor.subscribe('currentUser');
  let showAll = Session.get('showAll');
  let transferRateItemsSub = Meteor.subscribe('siteCircuitInfo');
  let prtgArray = Session.get('myMethodResult');
  let dbData = ItemsTransferRate.find().fetch()
  sortBy = (sortValue, sortOrder) =>{
    let keyString = "siteData.dataObj."+sortValue;
    let sortObj = {};
    let keyObj ={};
    keyObj[keyString] = sortOrder
    sortObj["sort"] = keyObj;
    return ItemsTransferRate.find({},sortObj).fetch();
  }
  return {
    showAll,
    ready: transferRateItemsSub.ready(),
    dbReturn: function data(sortValue, sortOrder){
      //debug
      //console.log(sortBy(sortValue, sortOrder))
      return sortBy(sortValue, sortOrder)
    }

  };
}, AppTransferRate);
