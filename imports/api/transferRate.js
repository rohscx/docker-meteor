process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { HTTP } from 'meteor/http'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import request from 'request';
import https from 'https';
import tempData0 from '../../server/tempData';

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
  let sitesObj = tempData0();
  console.log(sitesObj)
  let timeNow = Math.round(new Date().getTime() / 1000);
  let dateTime = new Date();
  //console.log(newData.sensors[value].objid)
  //console.log(typeof(newData.sensors[value].objid))
  //console.log("DATA ID ",data._id)
  /*sitesObj.map((data)=>{
    ItemsTransferRate.insert({
        siteData: {
          dataObj: data,
          requestTime: timeNow,
          dateTime: dateTime
        }
      });
  });*/



  Meteor.methods({

  });
}


export default ItemsTransferRate;
