import { Meteor } from 'meteor/meteor';

import Items from '../imports/api/Items';

import '../imports/server/accounts';
import '../imports/server/reqeust';

//publish user data in mini mongo
Meteor.publish('currentUser', function() {
  return Meteor.users.find({_id: this.userID}, {
    fields: {
      roles: 1
    }
  });
});

Meteor.startup(() => {
  // code to run on server at startup
});
