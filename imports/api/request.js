import { HTTP } from 'meteor/http'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';



const ItemsApic = new Mongo.Collection('itemsapic');

const ItemsApicSchema = new SimpleSchema ({
  text: String,
  value: SimpleSchema.Integer
});

const ItemsApcicSchema = new SimpleSchema ({
  itemOne: ItemApicSchema,
  lastUpdated : {
    type: Date,
    optional: true
  }
});

ItemsApic.attachSchema(ItemsApicSchema);

if (Meteor.isServer) {

  Meteor.publish('allApicItems', function() {
    return ItemsApic.find({}, {
      // limits the number of return json items from DB
      limit: 50,
      // value 1 (OLDEST) or -1 (NEWEST) determines directions of lastUpdated
      sort: {lastUpdated: 1}
    });
  });


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
        return e;
      }
    },
    insertNewApic(itemOne) {
      ItemsApic.insert({
          itemOne: {
            text: itemOne,
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
          ItemsApic.update(item._id, {
            $inc: {
              'itemOne.value': 1
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


export default ItemsApic;
