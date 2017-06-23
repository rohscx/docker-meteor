import { HTTP } from 'meteor/http'
import { Meteor } from 'meteor/meteor'


Meteor.methods({
  checkApic(type, url, options) {
    this.unblock();
    try {
const result = HTTP.call(type, url, options);
      // console.log(result); // debug
      return result;
    } catch (e) {
      // Got a network error, timeout, or HTTP error in the 400 or 500 range.
	    console.log(e) // debug
      return false;
    }
  }
});
