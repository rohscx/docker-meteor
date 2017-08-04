process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { HTTP } from 'meteor/http'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import request from 'request';
import https from 'https';


// apic
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
    return ItemsPrtg.find({}, {
      // limits the number of return json items from DB
      //limit: 50,
      // value 1 (OLDEST) or -1 (NEWEST) determines directions of lastUpdated
      //sort: {"prtgData.dateTime" : -1}
    });
  });


  const POLL_INTERVAL = 30000;
  Meteor.publish('prtgDeviceList', function() {
    /*
      data contains the entire return object
      data.content contains the contents
      headers contains the headers
      data.data.sensors contains an array of objects
      data.statusCode contains status code
      prtg data returns the following:
      statusCode: 200,
      content: '{"prtg-version":"17.2.30.1767","treesize":719,"sensors":[]}
    */
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
      let newData = JSON.parse(data.content);
      //console.log("DATAAAA  NEW",newData)
      //console.log("SENSORS",newData.sensors)
      console.log("TREE",newData.treesize)
      console.log("PUBLISHED KEYS",publishedKeys)
      newData.sensors.map((data) => {
        //console.log("DOCCCC ",data)
        console.log("DATA ID ",data._id)
        if (publishedKeys[data._id]) {
          let timeNow = Math.round(new Date().getTime() / 1000);
          let dateTime = new Date();
          ItemsPrtg.remove({"prtgData.requestTime": {"$lte" : Math.round(new Date().getTime()/1000 - 30) }})
          ItemsPrtg.insert({
              prtgData: {
                dataObj: data,
                requestTime: timeNow,
                dateTime: dateTime
              }
            });
          //this.changed(COLLECTION_NAME, data._id, data);
        } else {
          publishedKeys[data._id] = true;
          let timeNow = Math.round(new Date().getTime() / 1000);
          let dateTime = new Date();
          ItemsPrtg.insert({
              prtgData: {
                dataObj: data,
                requestTime: timeNow,
                dateTime: dateTime
              }
            });
          //this.added(COLLECTION_NAME, data._id, data);
        }
      });
      return ItemsPrtg.find({}, {
        // limits the number of return json items from DB
        //limit: 50,
        // value 1 (OLDEST) or -1 (NEWEST) determines directions of lastUpdated
        //sort: {"prtgData.dateTime" : -1}
      });
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
