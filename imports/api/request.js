process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { HTTP } from 'meteor/http'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import request from 'request';
import https from 'https';
import dns from 'dns';


// apic
const ItemsApic = new Mongo.Collection('itemsapic');
export const ItemsWebServerStatus = new Mongo.Collection('itemsWebServerStatus');

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

const ItemsApicSchema = new SimpleSchema ({
  apicData: ItemApicSchema
});
const ItemsWebServerStatusSchema = new SimpleSchema ({
  webServerData: ItemWebServerStatusSchema
});

ItemsApic.attachSchema(ItemsApicSchema);
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
    httpRequest(type, url, options) {
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
    },
    'getDateISO': function(){
      let dateRange = ()=>{
        convertDays = function (d) {
            //Convert days into MilliSeconds
            return d * 86400000;
        }
        let dateISO = (dateNum)=>{
          let newToday = new Date();
          let newLookupDate = new Date(newToday - convertDays(dateNum));
          newLookupDate = newLookupDate.toISOString().split('T')
          return newLookupDate[0];
        }
        let a = new Date()
        let today = dateISO(0);
        let yesterday = dateISO(1);
        let lastWeekStart = dateISO(a.getDay() + 7);
        let lastWeekEnd = dateISO(7 - a.getDay());
        var dateRangeLabels = {
            today: {
                start: today,
                end: today
            },
            yesterday: {
                start: yesterday,
                end: today
            },
            lastWeek: {
                start: lastWeekStart,
                end: lastWeekEnd
            }
        };
        return dateRangeLabels
      }
      return dateRange()
    },
    'getDnsLookup': function(hostName){
      let lookup = Meteor.wrapAsync(dns.lookup),
      ip = lookup(hostName)
      console.log(ip)
      return ip
    },
  });
}


export default ItemsApic;
