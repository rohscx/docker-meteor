process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { HTTP } from 'meteor/http'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import request from 'request';
import https from 'https';

// prtg
const ItemsPrimeHosts = new Mongo.Collection('itemprimehosts');

const ItemPrimeHostsSchema = new SimpleSchema ({
  dataObj: {
    type: Object,
    blackbox: true
  },
  requestTime: SimpleSchema.Integer,
  dateTime : {
    type: Date
  }
});


const ItemsPrimeHostsSchema = new SimpleSchema ({
  hostData: ItemPrimeHostsSchema
});

ItemsPrimeHosts.attachSchema(ItemsPrimeHostsSchema);


if (Meteor.isServer) {




  Meteor.methods({
    primeHttpRequest(type, url, options) {
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
  });
}


export default ItemsPrimeHosts;
