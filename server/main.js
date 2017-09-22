import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import Items from '../imports/api/Items';
import ItemsPrtg from '../imports/api/prtg';
import ItemsApicDevices from '../imports/api/apic';
import ItemsTransferRate from '../imports/api/transferRate';
import ItemsPrimeHosts from '../imports/api/prime';
import tempData from './tempData';

import '../imports/server/accounts';
import '../imports/api/request';
import '../imports/api/prtg';
import '../imports/api/transferRate';
import '../imports/api/apic';
import '../imports/api/prime';



(()=>{
  let clientId = false;
  let counter = 0;
  const self = this;
  const timeNow = () =>{
    return Math.round(new Date().getTime() / 1000);
  }
  const dateTime = new Date();
  const baseUrl = Meteor.settings.private.apicEM.uName ? Meteor.settings.private.apicEM.baseUrl : Meteor.settings.public.ciscoApicEM.baseUrl;
  const uName = Meteor.settings.private.apicEM.uName ? Meteor.settings.private.apicEM.uName : Meteor.settings.public.ciscoApicEM.uName;
  const uPass = Meteor.settings.private.apicEM.uName ? Meteor.settings.private.apicEM.uPass : Meteor.settings.public.ciscoApicEM.uPass;

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

  const findItem = (value)=>{
    return ItemsApicDevices.findOne({"siteData.dataObj.id":value});
  }
  const countCollections = ()=>{
    return ItemsApicDevices.find().count();
  }

  console.log("apicDevices Count: ",countCollections());

  const apicTicketUrn = '/api/v1/ticket';
  const ticketUrl = baseUrl + apicTicketUrn;
  const apicTicketOptions = {
    headers: { 'content-type': 'application/json' },
    data: {username: uName, password: uPass}
  };
  let apicDevicesUrn = "/api/v1/network-device";
  let devicesUrl = baseUrl + apicDevicesUrn;
  let ticketIdleTimeout = 0;
  let ticketSessionTimeout = 0;
  let oldApicTicket = "";

  const apicDevicesOptions = () => {
    const apicTicket = ()=>{
      const setTimeouts = (idleTimeout,sessionTimeout) =>{
        ticketIdleTimeout = timeNow() + idleTimeout;
        ticketSessionTimeout = timeNow() + sessionTimeout;
        //console.log("Ticket timeout <Time Now: Idle/Session> ",timeNow()+": "+ticketIdleTimeout+"/"+ticketSessionTimeout);
        //console.log("Requesting New ticket: ", oldApicTicket)
      }
      if (ticketIdleTimeout === 0 && ticketSessionTimeout === 0 ){
        let httpRequest = Meteor.call('apicTicket', "POST",ticketUrl,apicTicketOptions);
        oldApicTicket = httpRequest.data.response.serviceTicket;
        setTimeouts(1800,21600);
        console.log("###-New Ticket: ",oldApicTicket)
        console.log("###-Ticket timeout <Time Now: Idle/Session> ",timeNow()+": "+ticketIdleTimeout+"/"+ticketSessionTimeout);
        return httpRequest.data.response.serviceTicket;
      } else if (timeNow() >= ticketIdleTimeout || timeNow() >= ticketSessionTimeout){
        let httpRequest = Meteor.call('apicTicket', "POST",ticketUrl,apicTicketOptions);
        oldApicTicket = httpRequest.data.response.serviceTicket;
        setTimeouts(1800,21600);
        console.log("***-Ticket expired requesting new Ticket: ",oldApicTicket)
        console.log("***-Ticket timeout <Time Now: Idle/Session> ",timeNow()+": "+ticketIdleTimeout+"/"+ticketSessionTimeout);
        return httpRequest.data.response.serviceTicket;
      } else {
        console.log("Using Existing Ticket: ",oldApicTicket)
        //console.log("Ticket timeout <Time Now: Idle/Session> ",timeNow()+": "+ticketIdleTimeout+"/"+ticketSessionTimeout);
        return oldApicTicket;
      }
    }
    const requestObj = {
      headers: {
        'content-type': 'application/json',
        'x-auth-token': apicTicket()
      }
    }
    return requestObj;
  };

  async function httpRequest(method,url,options){
    const httpDevices = await Meteor.call('httpRequest', method,url,options);
    const apicDevices = await httpDevices;
    // error checking REST request. If not 200 do nothing and log
    if (await apicDevices.statusCode === 200) {
      // itterate over object
      return await Promise.all(apicDevices.data.response.map((data)=>{
        // debug
        //console.log(apicDevices)
        const managementIpAddress = data.managementIpAddress;
        const deviceId = data.id;
        const lastUpdateTime = data.lastUpdateTime;
        const dataCheck = ItemsApicDevices.find({"siteData.dataObj.managementIpAddress":managementIpAddress}).fetch();
        const normalize = data.hostname ? data.hostname.toLowerCase() : "Null";
        data.normalizeHostName = normalize;
        const vlanDetail = ()=>{
          if (data.family == "Unified AP"){
            return data.vlanDetail = null;
          } else {
            const devicesVlanUrl = baseUrl + "/api/v1/network-device" +"/"+ data.id+"/vlan";
            const vlanDetail = Meteor.call('apicHttpRequest',"GET",devicesVlanUrl,options);
            if (vlanDetail.statusCode == 200){
              if (vlanDetail.data.response.length <= 0){
                return data.vlanDetail = null;
              } else {
                return data.vlanDetail = vlanDetail.data.response;
              }
            } else {
              return data.vlanDetail = null;
            }
          }
        }

        // this function is not used, but will be used for something else
        const interfaceInfo = ()=>{
          if (data.family == "Switches and Hubs" || data.family == "Routers"){
            const interfaceInfoUrl = baseUrl + "/api/v1/interface/network-device" +"/"+ data.id;
            const interfaceInfoCall = Meteor.call('apicHttpRequest',"GET",interfaceInfoUrl,options);
            if (interfaceInfoCall.statusCode == 200){
              return data.interfaceInfo = interfaceInfoCall.data.response;
            }
          }
        }
        const dbInsert = ()=>{
          ItemsApicDevices.insert({
            siteData: {
              dataObj: data,
              requestTime: timeNow(),
              dateTime: dateTime
            }
          });
        }
        const dbTasks = () =>{
        let dbMatch = findItem(deviceId);
        // check for undefined, these do not exist in the db
        if (dbMatch === undefined) {
          // debug
          //console.log("undefined")
          ItemsApicDevices.remove({"siteData.dataObj.id":deviceId});
          vlanDetail();
          // will be used later
          interfaceInfo();
          dbInsert();
          // if there is a match compare the lastUpdateTimes, if they match it skips
        } else if (dbMatch.siteData.dataObj.lastUpdateTime == lastUpdateTime){
          // debug
          //console.log("Match Found",dbMatch.siteData.dataObj.lastUpdateTime);
          //console.log("equality")
          // remove matches that fail the lastUpdateTime comparison
        } else {
          // debug
          //console.log("unequal")
          ItemsApicDevices.remove({"siteData.dataObj.id":deviceId});
          vlanDetail();
          // will be used later
          interfaceInfo();
          dbInsert();
        }
        //ItemsApicDevices.remove({"siteData.dataObj.managementIpAddress":managementIpAddress,"siteData.dataObj.lastUpdateTime":{"$lte":lastUpdateTime}});
        }
        dbTasks();
      }))
    } else {
      console.log("REST FAILURE: ", apicDevices);
    }
  }
  const poll = () => {
      console.log("requesting upto 500 objects from APIC-EM")
      httpRequest("GET",devicesUrl,apicDevicesOptions())
      if (countCollections() >= 500){
        console.log("over 9000!!! actually it's only only over 500 Devices!!!")
        console.log("requesting upto ANOTHER 500 objects from APIC-EM")
        apicDevicesUrn500 = baseUrl+"/api/v1/network-device/501/500";
        httpRequest("GET",apicDevicesUrn500,apicDevicesOptions())
      }
  }
  const intervalId = Meteor.setInterval(()=>{
    counter++;
    console.log("Apic Data Publish on client Counter: %s",counter);
    return poll();
  },300000)
  poll()
})()










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
        "siteData.dataObj.interfaceInfo":1
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
