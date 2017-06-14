import {Template} from 'meteor/templating';

import Items from '../api/items.js';

import './body.html';

Template.body.helpers({
  hello: 'Hi World'
});

Template.body.events({
  'click .test'(event) {
    console.log('hello');
  }
});
