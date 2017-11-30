import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import Items from '../imports/api/Items';
import ItemsPrtg from '../imports/api/prtg';
import ItemsApicDevices from '../imports/api/apic';
import ItemsTransferRate from '../imports/api/transferRate';
import ItemsPrimeHosts from '../imports/api/prime';
import ItemsWebServerStatus from '../imports/api/webserverStatus';
import tempData from './tempData';

import { webServerStatus, blah } from '../imports/server/webServerStatus';
import { apicDevices} from '../imports/server/apicDevices';

import '../imports/api/webserverStatus';
import '../imports/server/accounts';
import '../imports/api/request';
import '../imports/api/prtg';
import '../imports/api/transferRate';
import '../imports/api/apic';
import '../imports/api/prime';



webServerStatus(Meteor.settings.webServerList);
Meteor.publish('webServerStatus', function() {

  let clientId = false;
  let counter = 0;
  const self = this;
  const clientIdent = {
    clientIp: "",
    clientId:false,
    setIp: function(ip){
      if (this.clientId === false){
        this.clientId = ip+" : "+Random.id();
        //console.log("data",this.clientId);
        return this.clientId;
      } else {
        //console.log("data",this.clientId);
        return this.clientId;
      }
    }
  }
  const countCollections = ()=>{
    return ItemsWebServerStatus.find().count();
  }
  const miniMongo = ()=>{
    return ItemsWebServerStatus.find();
  }

  console.log("ItemsWebServerStatus Count: ",countCollections());

  const poll = () => {
    return miniMongo();
  }
  const intervalId = Meteor.setInterval(()=>{
    counter++;
    console.log("ItemsWebServerStatus Data Publish on client %s Counter: %s",clientIdent.setIp(this.connection.clientAddress),counter);
    return poll();
  },300000)
  self.onStop(()=>{
    console.log("Terminating ItemsWebServerStatus Publish on client %s Counter After: %s",clientIdent.setIp(this.connection.clientAddress),counter);
    Meteor.clearInterval(intervalId)
  })
  return poll()
});












//publish user data in mini mongo
Meteor.publish('currentUser', function() {
  return Meteor.users.find({_id: this.userID}, {
    fields: {
      roles: 1
    }
  });
});


Meteor.publish('primeHosts', function() {
  let countCollections = ItemsPrimeHosts.find().count();
  let timeNow = Math.round(new Date().getTime() / 1000);
  let dateTime = new Date();
  let baseUrl = Meteor.settings.private.prime.uName ? Meteor.settings.private.prime.baseUrl : Meteor.settings.public.ciscoApicEM.baseUrl;
  let uName = Meteor.settings.private.prime.uName ? Meteor.settings.private.prime.uName : Meteor.settings.public.ciscoApicEM.uName;
  let uPass = Meteor.settings.private.prime.uName ? Meteor.settings.private.prime.uPass : Meteor.settings.public.ciscoApicEM.uPass;
  let primeLookupUrn = '/webacs/api/v1/data/Clients.json?.full=true&securityPolicyStatus=eq("FAILED")&.maxResults=400';
  let devicesUrl = baseUrl + primeLookupUrn;
  let primeOptions = {
    headers: { 'authorization': uName+" "+uPass, "accept": "application/json" }
  };
  let httpReturn = Meteor.call('primeHttpRequest', "GET",devicesUrl,primeOptions);
  //let apicTicket = httpTicket.data.response.serviceTicket;
  let primeHosts = httpReturn.content
  //console.log(httpReturn)
  // for whatever reason it's returned as a string from prime...
  primeHosts = JSON.parse(httpReturn.content)
  if (countCollections <= 0){
    primeHosts.queryResponse.entity.map((data)=>{
      ItemsPrimeHosts.insert({
          hostData: {
            dataObj: data,
            requestTime: timeNow,
            dateTime: dateTime
          }
        });
    })
    return ItemsPrimeHosts.find()
  } else {
    let currentTimeEpoch = Math.round(new Date().getTime()/1000);
    // returns the oldest DB items epoch timestamp
    let oldestDocument = ItemsPrimeHosts.find({},{sort:{"hostData.requestTime": -1},fields:{"hostData.requestTime": 1,_id:0},limit:1}).fetch();
    let oldestDocumentEpoch = oldestDocument[0].hostData.requestTime;
    if (currentTimeEpoch - oldestDocumentEpoch > 120) {
      ItemsPrimeHosts.remove({"hostData.requestTime": {"$lte" : Math.round(new Date().getTime()/1000 - 30) }});
      console.log("Prime Devices DB STALE Requesting NEW data")
      primeHosts.queryResponse.entity.map((data)=>{
        ItemsPrimeHosts.insert({
            hostData: {
              dataObj: data,
              requestTime: timeNow,
              dateTime: dateTime
            }
          });
      })
      return ItemsPrimeHosts.find()
    }
    return ItemsPrimeHosts.find()
  }
});






apicDevices();

Meteor.publish('apicDevices', function() {
  let clientId = false;
  let counter = 0;
  const self = this;
  const clientIdent = {
    clientIp: "",
    clientId:false,
    setIp: function(ip){
      if (this.clientId === false){
        this.clientId = ip+" : "+Random.id();
        //console.log("data",this.clientId);
        return this.clientId;
      } else {
        //console.log("data",this.clientId);
        return this.clientId;
      }
    }
  }
  const countCollections = ()=>{
    return ItemsApicDevices.find().count();
  }
  const miniMongo = ()=>{
    return ItemsApicDevices.find(
      {},
      {fields:{
        "siteData.dataObj.family":1,
        "siteData.dataObj.hostname": 1,
        "siteData.dataObj.role": 1,
        "siteData.dataObj.lastUpdated":1,
        "siteData.dataObj.managementIpAddress":1,
        "siteData.dataObj.softwareVersion":1,
        "siteData.dataObj.upTime":1,
        "siteData.dataObj.interfaceCount":1,
        "siteData.dataObj.series":1,
        "siteData.dataObj.serialNumber":1,
        "siteData.dataObj.reachabilityStatus":1,
        "siteData.dataObj.normalizeHostName":1,
        "siteData.dataObj.id":1,
        "siteData.dataObj.vlanDetail":1,
        "siteData.dataObj.reachabilityFailureReason":1,
        "siteData.dataObj.interfaceDetail":1,
        "siteData.dataObj.licenseDetail":1,
        "siteData.dataObj.commandRunner":1
      }
    });
  }

  console.log("apicDevices Count: ",countCollections());

  const poll = () => {
    return miniMongo();
  }
  const intervalId = Meteor.setInterval(()=>{
    counter++;
    console.log("Apic Data Publish on client %s Counter: %s",clientIdent.setIp(this.connection.clientAddress),counter);
    return poll();
  },300000)
  self.onStop(()=>{
    console.log("Terminating Apic Publish on client %s Counter After: %s",clientIdent.setIp(this.connection.clientAddress),counter);
    Meteor.clearInterval(intervalId)
  })
  return poll()
});









Meteor.publish('siteCircuitInfo', function() {
  let countCollections = ItemsTransferRate.find().count();
  console.log(Meteor.call('getDateISO'));

  if (countCollections <= 0){
    let sitesObj = tempData;
    //debug
    //console.log(sitesObj.tempData0())
    let temp = sitesObj.tempData0();
    let timeNow = Math.round(new Date().getTime() / 1000);
    let dateTime = new Date();
    //console.log(newData.sensors[value].objid)
    //console.log(typeof(newData.sensors[value].objid))
    //console.log("DATA ID ",data._id)
    temp.map((data)=>{
      ItemsTransferRate.insert({
          siteData: {
            dataObj: data,
            requestTime: timeNow,
            dateTime: dateTime
          }
        });
    });
  // return ready to load page, does not check data validity
  return ItemsTransferRate.find()
} else {
  return ItemsTransferRate.find();
}

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
    //this.ready();
    return ItemsPrtg.find({},{sort:{"prtgData.dataObj.group": 1,"prtgData.dataObj.device": 1}});
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
      //this.ready();
      return ItemsPrtg.find({},{sort:{"prtgData.dataObj.group": 1,"prtgData.dataObj.device": 1}});
    } else {
      //this.ready();
      return ItemsPrtg.find({},{sort:{"prtgData.dataObj.group": 1,"prtgData.dataObj.device": 1}});
    }
  }
});
Meteor.startup(() => {
  // code to run on server at startup
});
