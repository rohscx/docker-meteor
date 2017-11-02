process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { HTTP } from 'meteor/http'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import request from 'request';
import https from 'https';
import tempData from '../../server/tempData';

// apic

const ItemsApicDevices = new Mongo.Collection('itemapicdevices');
// simple schema debug
SimpleSchema.debug = true
const ItemTransferRateSchema = new SimpleSchema ({
  dataObj: {
    type: Object,
    blackbox: true
  },
  requestTime: SimpleSchema.Integer,
  dateTime : {
    type: Date
  }
});


const ItemsApicDevicesSchema = new SimpleSchema ({
  siteData: ItemTransferRateSchema
});

ItemsApicDevices.attachSchema(ItemsApicDevicesSchema);


if (Meteor.isServer) {

  Meteor.publish('dbApic', function(searchObj) {
    console.log("searchObj ",searchObj);
    console.log()
    return ItemsApicDevices.find(searchObj);
  })


  Meteor.methods({
    apicTicket(type, url, options) {
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
    apicHttpRequest(type, url, options) {
      this.unblock();
      try {
        return new Promise((resolve, reject) =>{
          const result = HTTP.call(type, url, options);
          // console.log(result); // debug
          resolve(result)
        })
      } catch (e) {
        reject(e)
        // Got a network error, timeout, or HTTP error in the 400 or 500 range.
        console.log(e) // debugs
      }
    },
  });
}


export default ItemsApicDevices;
