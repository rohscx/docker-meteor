import { HTTP } from 'meteor/http'

Meteor.methods({
  checkApic() {
    this.unblock();
    try {
const result = HTTP.call('POST', 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket', {
        headers: { contentType: 'application/json' },
	data: {username: 'devnetuser', password: 'Cisco123!'}
}, (error, result) => {
  if (!error) {
    console.log(error);
  }
	console.log(result);
});
      return true;
    } catch (e) {
      // Got a network error, timeout, or HTTP error in the 400 or 500 range.
      return false;
    }
  }
});
