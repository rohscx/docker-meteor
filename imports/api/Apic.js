import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';

const type = 'POST';
const url = 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket';
const options = {
        headers: { contentType: 'application/json' },
	data: {username: 'devnetuser', password: 'Cisco123!'}
};

const restRequest = Meteor.call('checkApic', type, url, options, (err, res) => {
  if (err) {
    alert(err);
  } else {
    // success!
    Session.set("data", res.data.response.serviceTicket);
    return Session.get("data");
  }
});


export default restRequest;
