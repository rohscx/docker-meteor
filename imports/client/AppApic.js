import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import { autobind } from 'core-decorators';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Apic from './Apic';

import IsRole from './utilities/IsRole';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';

import ItemApic from './ItemApic';
import Header from './components/Header';
import ItemsApic from '../api/request'
import ApicMenu from './components/ApicMenu';
import ApicTrace from './components/ApicTrace';

import { createStore } from 'redux';

// initializes the state
const initailState = {
  result = 1,
  lastValues: []
};

const reducer = (state = initailState, action) => {
  switch (action.type) {
    case "ADD":
      state.result += action.payload;
      break;
    case "SUBTRACT":
      state.result -= action.payload
      break;
  }
  return state;
}

const store = createStore(reducer);

store.subscribe(() =>{
  console.log("Store Updated", store.getState());
});

store.dispatch({
  type: "ADD",
  payload: 10
});

store.dispatch({
  type: "ADD",
  payload: 100
});

store.dispatch({
  type: "SUBTRACT",
  payload: 50
});

@autobind
 class AppApic extends Component {
   constructor() {
     super();
     this.state = {
       ticket: {},
       greeting: "",
       requestStatus:"",
       menu: []
     }
   }


   componentWillMount() {
      this.setState({
        ticket: {
          number: "Not Yet Requested",
          ready: false
        }
      });

      this.setState({
        greeting: "Welome to the APIC-EM App"
      });

      this.setState({
        requestStatus: true,
      });

      this.setState({
        menu: [
          "1",
          "2",
          "3"
        ]
      });
    }

  getItems() {
    let apic = new restRequest('GET', 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/host', {
          headers: { 'conten-type': 'application/json'}
        });
        apic.makeTicket();
        console.log('Ticket Rquested');
        //this.setState({ticket: {number: Session.get("apicTicket"), ready: true}});
  }

    addToken(event) {
      event.preventDefault();
      const itemOne = this.refs.itemOne.value.trim();
      if (itemOne != '') {
          Meteor.call('insertNewItem', itemOne, (err, res) => {
            if(!err) {
              this.refs.itemOne.value = '';
            }
          });
      }
    }

   showAll() {
     if(this.props.showAll) {
       Session.set('showAll', false);
     } else {
       Session.set('showAll', true);
     }
   }

   showList() {
     if(this.props.showList) {
       Session.set('showList', false);
       console.log('True it exists');
       console.log(this.props.showList);
       console.log(this.state.showList);
     } else {
       Session.set('showList', true);
       console.log('false it does not exist');
       console.log(this.props.showList);
       console.log(this.state.showList);
     }
   }

   showTrace() {
     if(this.props.showTrace) {
       Session.set('showTrace', false);
       console.log('True it exists');
       console.log(this.props.showTrace);
       console.log(this.state.showTrace);
     } else {
       Session.set('showTrace', true);
       console.log('false it does not exist');
       console.log(this.props.showTrace);
       console.log(this.state.showTrace);
     }
   }

   ticketStatus(){
     if(this.props.items.length != 0){
       if(this.props.items["0"].apicData.text) {
         let nowTime = Math.round(new Date().getTime() / 1000);
         let ticketTime = this.props.items["0"].apicData.requestTime;
         let expireTime = 1800;
         let activeText = "Active ";
         let expiredText = "Not Active ";
         if (nowTime - ticketTime < expireTime) {
           return activeText;
         } else {
           return expiredText;
         }
       }
     } else {
       return "BLERG";
     }
   }

   ticketList(){
     return (
       <button type="button" className="btn btn-primary" onClick={this.showList}>
         Show {this.props.showList ? 'One': 'All'}
       </button>
     );
   }

   ipTrace(){
     return (
       <button type="button" className="btn btn-primary" onClick={this.showTrace}>
         Trace {this.props.showTrace ? 'Shown': 'Hidden'}
       </button>
     );
   }

  render() {
    //console.log(Session.get("apicResponse")[0]);
    //console.log(this);
    if (!this.props.ready) {
      return <div>Loading APIC...</div>
    }
//<RestApic  changeTicket={this.changeTicket.bind(this)} makeReady={this.makeReady.bind(this)}/>
    console.log(this);
    return (
        <main>
          <IsRole role={['admin']} {... this.props}>
            <button onClick={this.showAll}>
              Show {this.props.showAll ? 'One': 'All'}
            </button>
          </IsRole>
          <Header {... this.state} ticketStatus={this.ticketStatus.bind(this)} />
          <ApicMenu {... this.state} />
            <Apic {... this.state} ticketStatus={this.ticketStatus.bind(this)} ticketList={this.ticketList.bind(this)} ipTrace={this.ipTrace.bind(this)} />
            <ApicTrace {... this.props}/>
              {this.props.showList ?
                <ReactCSSTransitionGroup
                  transitionName='itemApic'
                  transitionEnterTimeout={600}
                  transitionLeaveTimeout={600}
                  transitionAppear={true}
                  transistionAppearTimeout={600}>
                  {this.props.items.map((item) => {
                    return <ItemApic item={item} key={item}/>
                  })}
                </ReactCSSTransitionGroup> : <p>CATS</p>
              }

        </main>
    );
  }
}

export default createContainer(({params}) => {
  let itemsSub = Meteor.subscribe('allApicItems');
  let userSub = Meteor.subscribe('currentUser');
  let showAll = Session.get('showAll');
  let showList = Session.get('showList');
  let showTrace = Session.get('showTrace');
  let itemsArray;
  if(params.id) {
    itemsArray = ItemsApic.find({_id: params.id}).fetch();
  } else {
    itemsArray = ItemsApic.find({}, {
      // ternary operator. a form of IF THEN statement
      //limit: 1000,
      // value 1 (OLDEST) or -1 (NEWEST) determines directions of lastUpdated
      //sort: {apicData: {dateTime: -1}}
    }).fetch()
  }
  return {
    showAll,
    showList,
    showTrace,
    ready: itemsSub.ready() && userSub.ready(),
    items: itemsArray
  }
}, AppApic);
