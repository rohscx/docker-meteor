import React, {Component} from 'react';
import { Session } from 'meteor/session';
// WORK IN PROGRESS
export default class Trace extends Component {
  constructor(props) {
  super(props);
  this.state = {
    isLoading: true
  }
}

  loadData(){
    console.log(this);
    // Constructor
    function restRequest(type, url, options) {
      // always initialize all instance properties
      this.apicAPI = 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1';
      this.apicTicket = '/ticket';
      this.apicFlow = '/flow-analysis';
      this.apicFlowAnalysisId= '';
      this.apicTicketURL = this.apicAPI + this.apicTicket;
      this.apicFlowURL = this.apicAPI + this.apicFlow;
      this.apicFlowAnalysisIdURL= this.apicAPI + his.apicFlow + this.apicFlowAnalysisId;
      this.apicTicketOptions = {
        headers: { 'content-type': 'application/json' },
        data: {username: 'devnetuser', password: 'Cisco123!'}
      }
      this.apicFlowOptions = options;

      this.typeFlow = type;
      this.urlFlow = url;
      this.optionsFlow = options;
      this.urlTicket = 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket';
      this.optionsTicket = {
        headers: { 'content-type': 'application/json' },
    	  data: {username: 'devnetuser', password: 'Cisco123!'}
      }
    }

    // Method REQUEST a ticket from APIC
    restRequest.prototype.makeTicket = function() {
      Meteor.call('checkApic', 'POST', this.apicTicketURL, this.apicTicketOptions, (err, res) => {
      if (err) {
        alert(err);
      } else {
        // success!
        console.log(res);	// debug
        console.log(this); // debug
        this.ticket = res.data.response.serviceTicket;
        this.optionsFlow.headers['x-auth-token'] = res.data.response.serviceTicket;
        //Session.set("apicTicket", res.data.response.serviceTicket);
        this.makeFlowID();
      }
    })};


    // Method USE the ticket from APIC
    restRequest.prototype.makeFlowID = function() {
      Meteor.call('checkApic', this.typeFlow, this.urlFlow, this.optionsFlow, (err, res) => {
      let emptyArray = "This is unfortunate. No data has been returned..."
      if (err) {
        alert(err);
      } else {
        console.log(res); // debug
        if(res.data.response.length == 0){
          this.dataObj = {response: {data: {dataError: emptyArray}}};
        } else {
          this.dataObj = res.data;
          console.log(this.dataObj);
          //Session.set("apicFlowResponse", res.data.response.flowAnalysisId);
          //this.addToDB();
        }
      }
    })};

    restRequest.prototype.useFlowID = function() {
      Meteor.call('checkApic', this.type, this.url, this.options, (err, res) => {
      let emptyArray = "This is unfortunate. No data has been returned..."
      if (err) {
        alert(err);
      } else {
        console.log(res); // debug
        if(res.data.response.length == 0){
          this.dataObj = {response: {data: {dataError: emptyArray}}};
        } else {
          this.dataObj = res.data;
          console.log(this.dataObj);
          //Session.set("apicResponse", res.data.response);
          //this.addToDB();
        }
      }
    })};

    restRequest.prototype.addToDB = function() {
      Meteor.call('insertNewApic', this.ticket, this.dataObj, (err, res) => {
      if (err) {
        alert(err);
      } else {
        // console.log('Ticket submitted');
      }
    })};

    let apic = new restRequest('POST', 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/flow-analysis', {
          headers: { 'content-type': 'application/json'},
          data: { 'sourceIP': '10.2.1.22', 'destIP': '10.1.12.20'}
        });
        apic.makeTicket();
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <p>Loading Trace data!!!!....!!!</p>
      );
    }
    return(
      <p>Apic Trace Complete</p>
    )
  }
}
