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
    let data = [];
    data.push(ItemsPrtg.find().fetch());
    return data;
  });


  Meteor.publish('prtgDeviceList', function() {
    let countCollections = ItemsPrtg.find().count();
    console.log(countCollections);
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
    let url = baseUrl+"/api/table.json?content=sensors&output=json&columns=objid,probe,group,device,sensor,status,message,lastvalue,priority,favorite&count=20000"+uCreds;
    let options;
    let agent;
    const publishedKeys = {};
    if(countCollections <= 0){
      console.log("HIT COUNT COLLECTION FAILURE <= 0")
      const poll = () => {
        // Let's assume the data comes back as an array of JSON documents, with an _id field, for simplicity
        const data = HTTP.get(url, options);
        let newData = JSON.parse(data.content);
        //console.log("DATAAAA  NEW",newData)
        //console.log("SENSORS",newData.sensors)
        //console.log("TREE",newData.treesize)
        //console.log("PUBLISHED KEYS",publishedKeys)
        newData.sensors.map((data,value) => {
          let newUri = baseUrl+"/chart.png?type=graph&graphid=0&width=925&height=300&id="+newData.sensors[value].objid+uCreds;
          let timeNow = Math.round(new Date().getTime() / 1000);
          let dateTime = new Date();
          //console.log(newData.sensors[value].objid)
          //console.log(typeof(newData.sensors[value].objid))
          //console.log("DATA ID ",data._id)
          data.graph = newUri;
          ItemsPrtg.insert({
              prtgData: {
                dataObj: data,
                requestTime: timeNow,
                dateTime: dateTime
              }
            });
        });
      };
      poll();
      this.ready();
    } else {
      console.log("HIT COLLECTION EXISTS!!!")
      // gets the current time epoch
      let currentTimeEpoch = Math.round(new Date().getTime()/1000);
      // returns the oldest DB items epoch timestamp
      let oldestDocument = ItemsPrtg.find({},{sort:{"prtgData.requestTime": -1},fields:{"prtgData.requestTime": 1,_id:0},limit:1}).fetch();
      // sets var to be only the epoch
      let oldestDocumentEpoch = oldestDocument[0].prtgData.requestTime;
      console.log("Document Epoch",oldestDocumentEpoch," == ","Elapsed Time",currentTimeEpoch - oldestDocumentEpoch);
      if(currentTimeEpoch - oldestDocumentEpoch > 3600){
        console.log("HIT COLLECTION EXISTS!!! BUT IS OLD!!!!")
        // removes old DB collection documents
        ItemsPrtg.remove({"prtgData.requestTime": {"$lte" : Math.round(new Date().getTime()/1000 - 30) }})
        const poll = () => {
          // Let's assume the data comes back as an array of JSON documents, with an _id field, for simplicity
          const data = HTTP.get(url, options);
          let newData = JSON.parse(data.content);
          //console.log("DATAAAA  NEW",newData)
          //console.log("SENSORS",newData.sensors)
          //console.log("TREE",newData.treesize)
          //console.log("PUBLISHED KEYS",publishedKeys)
          newData.sensors.map((data,value) => {
            let newUri = baseUrl+"/chart.png?type=graph&graphid=0&width=925&height=300&id="+newData.sensors[value].objid+uCreds;
            let timeNow = Math.round(new Date().getTime() / 1000);
            let dateTime = new Date();
            //console.log(newData.sensors[value].objid)
            //console.log(typeof(newData.sensors[value].objid))
            //console.log("DATA ID ",data._id)
            data.graph = newUri;
            ItemsPrtg.insert({
                prtgData: {
                  dataObj: data,
                  requestTime: timeNow,
                  dateTime: dateTime
                }
              });
          });
        };
        poll();
        this.ready();
      } else {
        this.ready();
      }
    }
  });


  Meteor.methods({
    'getPrtgData': function(){
      return ItemsPrtg.find({},{sort:{"prtgData.dataObj.group": 1,"prtgData.dataObj.device": 1}}).fetch()
    },
    'getPrtgDeviceNames': function(){
      let dataArray=[];
      let prtgData = ItemsPrtg.find({},{sort:{"prtgData.dataObj.group": 1,"prtgData.dataObj.device": 1},fields:{"prtgData.dataObj.device": 1,_id:0}}).fetch();

      prtgData.map((data)=>{
        dataArray.push(data.prtgData.dataObj.device)
      })

      return prtgData
    }
  });
}


export default ItemsPrtg;
