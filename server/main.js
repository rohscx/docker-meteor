import { Meteor } from 'meteor/meteor';

const Tests = new Mongo.collection('tests');

Meteor.startup(() => {
  Test.insert({
    name: 'Hi',
    value: 1
  });
  // code to run on server at startup
});
