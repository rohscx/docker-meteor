process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { HTTP } from 'meteor/http'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import request from 'request';
import https from 'https';

// prtg
const ItemsPrtg = new Mongo.Collection('itemsprtg');

const ItemPrtgSchema = new SimpleSchema ({
  dataObj: {
    type: Object,
    blackbox: true
  },
  requestTime: SimpleSchema.Integer,
  dateTime : {
    type: Date
  }
});


const ItemsPrtgSchema = new SimpleSchema ({
  prtgData: ItemPrtgSchema
});

ItemsPrtg.attachSchema(ItemsPrtgSchema);



if (Meteor.isServer) {

  Meteor.publish('allApicItems', function() {
    return ItemsApic.find({}, {
      // limits the number of return json items from DB
      //limit: 50,
      // value 1 (OLDEST) or -1 (NEWEST) determines directions of lastUpdated
      sort: {"apicData.dateTime" : -1}
    });
  });

  Meteor.publish('allPrtgItems', function() {

    return ItemsPrtg.find({},{sort:{"prtgData.dataObj.group": 1,"prtgData.dataObj.device": 1}});
  });





  Meteor.methods({
    'getPrtgData': function(){
      return ItemsPrtg.find({},{sort:{"prtgData.dataObj.group": 1,"prtgData.dataObj.device": 1}}).fetch();
    },
    'getPrtgDataFiltered': function(){
      const self = this;
      self.added('itemsprtg',Random.id(),{data});
      self.ready();
      let more = num;
      const intervalID = Meteor.setInterval(()=>{
        more ++;
        self.added('itemsprtg',Random.id(),{more})
      },5000);

      self.onStop(()=>{
        Meteor.clearInterval(intervalID);
      });
    },
  });
}


export default ItemsPrtg;
