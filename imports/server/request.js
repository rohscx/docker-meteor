import { HTTP } from 'meteor/http'
import { Meteor } from 'meteor/meteor'

const options = {
        headers: { contentType: 'application/json' },
	data: {username: 'devnetuser', password: 'Cisco123!'}
};

Meteor.methods({
  checkApic() {
    this.unblock();
    try {
const result = HTTP.call('POST', 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket', options);
      console.log(result);
      return result;
    } catch (e) {
      // Got a network error, timeout, or HTTP error in the 400 or 500 range.
	    console.log(e)
      return false;
    }
  }
});


