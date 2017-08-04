process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { HTTP } from 'meteor/http'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import request from 'request';
import https from 'https';



const ItemsApic = new Mongo.Collection('itemsapic');

const ItemApicSchema = new SimpleSchema ({
  text: String,
  dataObj: {
    type: Object,
    blackbox: true
  },
  requestTime: SimpleSchema.Integer,
  dateTime : {
    type: Date
  }
});

const ItemsApicSchema = new SimpleSchema ({
  apicData: ItemApicSchema
});

ItemsApic.attachSchema(ItemsApicSchema);

if (Meteor.isServer) {

  Meteor.publish('allApicItems', function() {
    return ItemsApic.find({}, {
      // limits the number of return json items from DB
      //limit: 50,
      // value 1 (OLDEST) or -1 (NEWEST) determines directions of lastUpdated
      sort: {"apicData.dateTime" : -1}
    });
  });




  const POLL_INTERVAL = 30000;
  Meteor.publish('prtgDeviceList', function() {
    let type = "GET";
    let baseUrl = Meteor.settings.private.prtgRest.baseUrl;
    let uName = Meteor.settings.private.prtgRest.uName;
    let uPass = Meteor.settings.private.prtgRest.uPass;
    let uCreds = "&username="+uName+"&passhash="+uPass;
    let url = baseUrl+"/api/table.json?content=sensors&output=json&columns=objid,probe,group,device,sensor,status,message,lastvalue,priority,favorite"+uCreds;
    let options;
    let agent;
    const publishedKeys = {};
    const poll = () => {
      // Let's assume the data comes back as an array of JSON documents, with an _id field, for simplicity
      const data = HTTP.get(url, options);
      let newData = data;
      console.log("DATAAAA  NEW",newData.content)
      /*
      data.forEach((doc) => {
        console.log("DOCCCC",doc)
        if (publishedKeys[doc._id]) {
          this.changed(COLLECTION_NAME, doc._id, doc);
        } else {
          publishedKeys[doc._id] = true;
          this.added(COLLECTION_NAME, doc._id, doc);
        }
      });*/
    };
    poll();
    this.ready();
    const interval = Meteor.setInterval(poll, POLL_INTERVAL);
    this.onStop(() => {
      Meteor.clearInterval(interval);
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
    insertNewApic(apicTicket,dataObj) {
      let timeNow = Math.round(new Date().getTime() / 1000);
      let dateTime = new Date();
      ItemsApic.insert({
          apicData: {
            text: apicTicket,
            dataObj: dataObj,
            requestTime: timeNow,
            dateTime: dateTime
          }
        });
        Roles.addUsersToRoles(Meteor.userId(), 'sumitter')
    },
    voteOnItemApic(item, position) {
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
