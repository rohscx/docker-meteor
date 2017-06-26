import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';

export default class Apic extends Component {
// Constructor
function restRequest(type,url,options) {
  // always initialize all instance properties
  this.type = type;
  this.url = url;
  this.options = options;
  this.typeTicket = 'POST';
  this.urlTicket = 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket';
  this.optionsTicket = {
        headers: { 'content-type': 'application/json' },
	data: {username: 'devnetuser', password: 'Cisco123!'}
   };
}

// Method REQUEST a ticket from APIC
restRequest.prototype.makeTicket = function() {
  Meteor.call('checkApic', this.typeTicket, this.urlTicket, this.optionsTicket, (err, res) => {
  if (err) {
    alert(err);
  } else {
    // success!
    // console.log(res.data.response.serviceTicket);	// debug
    this.ticket = res.data.response.serviceTicket;
    this.options.headers['x-auth-token'] = res.data.response.serviceTicket;
    Session.set("apicTicket", res.data.response.serviceTicket);
    console.log(this.ticket);
    console.log('TICKET ABOVE');
    return this.ticket;

  }
  return 'CATS ON';
})};


// Method USE the ticket from APIC
restRequest.prototype.useTicket = function() {
  Meteor.call('checkApic', this.type, this.url, this.options, (err, res) => {
  if (err) {
    alert(err);
  } else {
    // success!
    // console.log(res); // debug
    console.log(JSON.parse(JSON.stringify(res))); // debug
    this.response = res;
    Session.set("apicResponse", res.data.response);
    return res;
  }
})};

}

export default restRequest;
