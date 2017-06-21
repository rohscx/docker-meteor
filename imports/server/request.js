import { HTTP } from 'meteor/http'

Meteor.methods({
  checkApic() {
    this.unblock();
    try {
      const result = HTTP.call('POST', 'http://api.twitter.com/xyz', {
  data: { some: 'json', stuff: 1 }
}, (error, result) => {
  if (!error) {
    Session.set('twizzled', true);
  }
});
      return true;
    } catch (e) {
      // Got a network error, timeout, or HTTP error in the 400 or 500 range.
      return false;
    }
  }
});
