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
import GenericRequest from '../imports/api/GenericRequest';
import { prtgDevices} from '../imports/server/prtgDevices';

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
  return ItemsPrtg.find({},{sort:{"prtgData.dataObj.group": 1,"prtgData.dataObj.device": 1}});
});
Meteor.startup(() => {
  // code to run on server at startup
});
