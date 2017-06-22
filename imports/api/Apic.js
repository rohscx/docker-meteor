import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';

const typeTicket = 'POST';
const urlTicket = 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket';
const optionsTicket = {
        headers: { 'content-type': 'application/json' },
	data: {username: 'devnetuser', password: 'Cisco123!'}
};

const typeApic = 'GET';
const urlApic = 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/host';
const optionsApic = {
        headers: { 'conten-type': 'application/json',
		  'x-auth-token': Session.get("data"),
		 }
};

const restRequest = Meteor.call('checkApic', typeTicket, urlTicket, optionsTicket, (err, res) => {
  if (err) {
    alert(err);
  } else {
    // success!
    Session.set("data", res.data.response.serviceTicket);
    Meteor.call('checkApic', typeApic, urlApic, optionsApic, (err, res) => {
      if (err) {
        alert(err);
      } else {
        // success!
        Session.set("data", res.content);
        return Session.get("data");
      }
    });
    //return Session.get("data");
  }
});


export default restRequest;
