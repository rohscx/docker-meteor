process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { HTTP } from 'meteor/http'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import request from 'request';
import https from 'https';
import tempData from '../../server/tempData';

// prtg
const ItemsTransferRate = new Mongo.Collection('itemstransferrate');

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


const ItemsTransferRateSchema = new SimpleSchema ({
  transferRateData: ItemTransferRateSchema
});

ItemsTransferRate.attachSchema(ItemsTransferRateSchema);


if (Meteor.isServer) {




  Meteor.methods({

  });
}


export default ItemsTransferRate;
