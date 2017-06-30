import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Items = new Mongo.Collection('items');

const ItemSchema = new SimpleSchema ({
  text: String,
  value: SimpleSchema.Integer
});

const ItemsSchema = new SimpleSchema ({
  itemOne: ItemSchema,
  itemTwo: ItemSchema,
  lastUpdated : {
    type: Date,
    optional: true
  }
});

Items.attachSchema(ItemsSchema);

if (Meteor.isServer) {

  Meteor.publish('allItems', function() {
    return Items.find({}, {
      // limits the number of return json items from DB
      limit: 50,
      // value 1 (OLDEST) or -1 (NEWEST) determines directions of lastUpdated
      sort: {lastUpdated: 1}
    });
  });


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
        Roles.addUsersToRoles(Meteor.userId(), 'sumitter')
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
        Roles.addUsersToRoles(Meteor.userId(), 'voter')
      }
    }
  });
}


export default Items;
