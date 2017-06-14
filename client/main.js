import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.body.helpers({
  resolutions: [
    { tittle: "Hello Resolutions #1" }
  ]
});
