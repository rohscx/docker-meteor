import { Mongo } from 'meteor/mongo';

const Items = new Mongo.Collection('items');

if (Meteor.isServer) {

  Meteor.publish('allItems', function() {
    return Items.find({}, {
      // limits the number of return json items from DB
      limit: 1,
      // value 1 (OLDEST) or -1 (NEWEST) determines directions of lastUpdated
      sort: {lastUpdated: 1}
    });
  });


  Meteor.methods({
    insertNewItem(itemOne,itemTwo) {
      check(itemOne, String);
      check(itemTwo, String);
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
    },
    voteOnItem(item, position) {
      check(item, Object);
      let lastUpdated = new Date();
      if(Meteor.userId()) {
        if(position == 'itemOne') {
          Items.update(item._id, {
            $inc: {
              'itemOne.value': 1
            },
            $set: {
              lastUpdated
            }
          })
        } else {
          Items.update(item._id, {
            $inc: {
              'itemTwo.value': 1
            },
            $set: {
              lastUpdated
            }
          })
        }
      }
    }
  });
}


export default Items;
