import { Mongo } from 'meteor/mongo';

const Items = new Mongo.Collection('items');

Meteor.methods({
  insertNewItem(itemOne,itemTwo) {
    Items.insert({
        itemOne: {
          text: itemOne,
          value: 0,
        },
        itemTwo: {
          text: itemTwo,
          value: 0,
        }
      });
  }
});

export default Items;
