process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { HTTP } from 'meteor/http'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import request from 'request';
import https from 'https';
import dns from 'dns';


// apic
const ItemsWebServerStatus = new Mongo.Collection('itemswebserverstatus');

const ItemWebServerStatusSchema = new SimpleSchema ({
  dataObj: {
    type: Object,
    blackbox: true
  },
  requestTime: SimpleSchema.Integer,
  dateTime : {
    type: Date
  }
});

const ItemsWebServerStatusSchema = new SimpleSchema ({
  webServerData: ItemWebServerStatusSchema
});

ItemsWebServerStatus.attachSchema(ItemsWebServerStatusSchema);








if (Meteor.isServer) {

/*
  Meteor.publish('allApicItems', function() {
    return ItemsApic.find({}, {
      // limits the number of return json items from DB
      //limit: 50,
      // value 1 (OLDEST) or -1 (NEWEST) determines directions of lastUpdated
      sort: {"apicData.dateTime" : -1}
    });
  });
*/


  Meteor.methods({
    updateItemsWebServerStatus(dbId,adminStatus) {
      // Data Check. Should be num 1 or 0
      if ((adminStatus == 1 || adminStatus == 0)) {
        ItemsWebServerStatus.update(dbId {
          $set:{
            adminStatus:{
              enable: adminStatus
            }
          }
        });
      } else {
        console.log("No changes made: adminStatus should be 1 or 0: webserverStatus.js, Meteor Method...")
      }
    },
  });
}

export default ItemsWebServerStatus;
