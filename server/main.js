import { Meteor } from 'meteor/meteor';

const Tests = new Mongo.Collection('tests');

Meteor.startup(() => {
  Tests.insert({
    name: 'hi',
    value: 1
  });

  // code to run on server at startup
});
