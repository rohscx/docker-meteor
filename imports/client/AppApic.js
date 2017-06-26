import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import { autobind } from 'core-decorators';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import restRequest from '../api/Apic';

import IsRole from './utilities/IsRole';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';

import ItemApic from './ItemApic';
import Header from './components/Header';

@autobind
 class AppApic extends Component {
   constructor() {
     super();
     this.state = {
       ticket: {
         number: "Not Yet Requested",
         ready: false
       },
       greeting: "WelcomE new"
     }
   }

/*
   componentDidMount() {
      this.getItems();
    }
*/
  getItems() {
    let apic = new restRequest('GET', 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/host', {
          headers: { 'conten-type': 'application/json'}
        });
        apic.makeTicket();
        console.log('Ticket Rquested');

        //this.props.changeTicket(Session.get("apicTicket"));
        //this.props.makeReady(Session.get("apicTicket"));
        //this.setState({ticket{number: "adsf"}});
        //this.setState({ticket{ready: true}});
        console.log(apic);
        console.log(this);
        //this.setState({ticket: Session.get("apicTicket")});
        //this.setState({ticket: Session.get("apicTicket")});
        //this.setState({ticket: 'lkjhjkhjkhlkj'});
        this.setState({ticket{number: "adsf"}});

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



   changeTicket(ticket){
     console.log(this);
     console.log('changeTicket');
     this.setState({greeting: "Cats on everything"});


   }

   makeReady(ticket){
     console.log(this);
     console.log('makeReady');

   }

  render() {
    //console.log(Session.get("apicResponse")[0]);
    console.log(this);
    if (!this.props.ready) {
      return <div>Loading APIC...</div>
    }
//<RestApic  changeTicket={this.changeTicket.bind(this)} makeReady={this.makeReady.bind(this)}/>
    return (
        <main>
          <IsRole role={['admin']} {... this.props}>
            <button onClick={this.showAll}>
              Show {this.props.showAll ? 'One': 'All'}
            </button>
          </IsRole>
          <Header {... this.state}/>
            <button onClick={this.getItems}>
              apicGet {this.props.showAll ? 'One': 'All'}
            </button>
            <ItemApic />

             <ReactCSSTransitionGroup
               transitionName='item'
               transitionEnterTimeout={600}
               transitionLeaveTimeout={600}
               transitionAppear={true}
               transistionAppearTimeout={600}>
           </ReactCSSTransitionGroup>
        </main>
    );
  }
}

export default createContainer(({params}) => {
  let itemsSub = Meteor.subscribe('allItems');
  let userSub = Meteor.subscribe('currentUser');
  let showAll = Session.get('showAll');
  let itemsArray;
  return {
    showAll,
    ready: userSub.ready()
  }
}, AppApic);
