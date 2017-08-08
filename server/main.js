import { Meteor } from 'meteor/meteor';
import Items from '../imports/api/Items';

import '../imports/server/accounts';
import '../imports/api/request';
import '../imports/api/prtg';

//publish user data in mini mongo
Meteor.publish('currentUser', function() {
  return Meteor.users.find({_id: this.userID}, {
    fields: {
      roles: 1
    }
  });
});

Meteor.publish('test', function() {
  return ItemsPrtg.find({}, {});
});

Meteor.startup(() => {
  // code to run on server at startup
});
