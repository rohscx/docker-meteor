import { HTTP } from 'meteor/http'

const result = HTTP.call('POST', 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket', {
        headers: { contentType: 'application/json' },
	data: {username: 'devnetuser', password: 'Cisco123!'}
}, (error, result) => {
  if (!error) {
    console.log(error);
  }
	console.log(result);
});

const cats = 'Cats';

export default cats;
