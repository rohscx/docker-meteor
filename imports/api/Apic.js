import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';

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
  this.ticket = '';

}

restRequest.prototype.makeTicket = function() {
  Meteor.call('checkApic', type, url, options, (err, res) => {
  if (err) {
    alert(err);
  } else {
    // success!
    console.log(res.data.response.serviceTicket);
    this.ticket = res.data.response.serviceTicket;
    Session.set("data", res.data.response.serviceTicket);
  }
});



const typeApic = 'GET';
const urlApic = 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/host';
const optionsApic = {
        headers: { 'conten-type': 'application/json',
		  'x-auth-token': Session.get("data"),
		 }



export default restRequest;
