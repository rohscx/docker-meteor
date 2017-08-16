import { Meteor } from 'meteor/meteor';
import Items from '../imports/api/Items';
import ItemsPrtg from '../imports/api/prtg';
import ItemsApicDevices from '../imports/api/apic';
import ItemsTransferRate from '../imports/api/transferRate';
import tempData from './tempData';

import '../imports/server/accounts';
import '../imports/api/request';
import '../imports/api/prtg';
import '../imports/api/transferRate';
import '../imports/api/apic';

//publish user data in mini mongo
Meteor.publish('currentUser', function() {
  return Meteor.users.find({_id: this.userID}, {
    fields: {
      roles: 1
    }
  });
});

Meteor.publish('apicDevices', function() {
  let countCollections = ItemsApicDevices.find().count();
  console.log("apicDevices Count = ",countCollections);
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
  let timeNow = Math.round(new Date().getTime() / 1000);
  let dateTime = new Date();
  let baseUrl = Meteor.settings.private.apicEM.uName ? Meteor.settings.private.apicEM.baseUrl : Meteor.settings.public.ciscoApicEM.baseUrl;
  let uName = Meteor.settings.private.apicEM.uName ? Meteor.settings.private.apicEM.uName : Meteor.settings.public.ciscoApicEM.uName;
  let uPass = Meteor.settings.private.apicEM.uName ? Meteor.settings.private.apicEM.uPass : Meteor.settings.public.ciscoApicEM.uPass;
  let apicTicketUrn = '/api/v1/ticket';
  let ticketUrl = baseUrl + apicTicketUrn;
  let apicDevicesUrn = "/api/v1/network-device";
  let devicesUrl = baseUrl + apicDevicesUrn;
  let apicTicketOptions = {
    headers: { 'content-type': 'application/json' },
    data: {username: uName, password: uPass}
  };
  let httpTicket = Meteor.call('apicTicket', "POST",ticketUrl,apicTicketOptions);
  let apicTicket = httpTicket.data.response.serviceTicket;
  console.log(apicTicket)
  let apicDevicesOptions = {
    headers: {
      'content-type': 'application/json',
      'x-auth-token': apicTicket
    }
  };
  httpDevices = Meteor.call('apicTicket', "GET",devicesUrl,apicDevicesOptions);
  apicDevices = httpDevices.data.response;

  // debug
  //console.log("ticket Test",Meteor.call('apicTicket', "POST",ticketUrl,apicTicketOptions))
  //console.log("Devices Test",Meteor.call('apicTicket', "GET",devicesUrl,apicDevicesOptions))
  if (countCollections <= 0){
    console.log("Apic Devices DB Empty Requesting data")
    apicDevices.map((data)=>{
      let normalize = data.hostname.toLowerCase();
      data.normalizeHostName = normalize;
      ItemsApicDevices.insert({
          siteData: {
            dataObj: data,
            requestTime: timeNow,
            dateTime: dateTime
          }
        });
    });
    if (apicDevices.length == 500){
      console.log("over 500 Devices!!!")
      apicDevicesUrn = "/api/v1/network-device/501/500";
      devicesUrl = baseUrl + apicDevicesUrn;
      httpDevicesOver500 = Meteor.call('apicTicket', "GET",devicesUrl,apicDevicesOptions);
      console.log("Adding to DB: ",httpDevicesOver500.data.response.length)
      httpDevicesOver500.data.response.map((data)=>{
        let normalize = data.hostname.toLowerCase();
        data.normalizeHostName = normalize;
        ItemsApicDevices.insert({
            siteData: {
              dataObj: data,
              requestTime: timeNow,
              dateTime: dateTime
            }
          });
      });
    }
    console.log("RETURNING APIC-EM DATA TO CLIENT")
    return ItemsApicDevices.find({},{fields:{
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
      "siteData.dataObj.normalizeHostName":1
    }
     })
  } else {
    let currentTimeEpoch = Math.round(new Date().getTime()/1000);
    // returns the oldest DB items epoch timestamp
    let oldestDocument = ItemsApicDevices.find({},{sort:{"siteData.requestTime": -1},fields:{"siteData.requestTime": 1,_id:0},limit:1}).fetch();
    let oldestDocumentEpoch = oldestDocument[0].siteData.requestTime;
    if (currentTimeEpoch - oldestDocumentEpoch > 120) {
      ItemsApicDevices.remove({"siteData.requestTime": {"$lte" : Math.round(new Date().getTime()/1000 - 30) }});
      console.log("Apic Devices DB STALE Requesting NEW data")
      apicDevices.map((data)=>{
        let normalize = data.hostname.toLowerCase();
        data.normalizeHostName = normalize;
        ItemsApicDevices.insert({
            siteData: {
              dataObj: data,
              requestTime: timeNow,
              dateTime: dateTime
            }
          });
      });
      if (apicDevices.length == 500){
        console.log("over 500 Devices!!!")
        apicDevicesUrn = "/api/v1/network-device/501/500";
        devicesUrl = baseUrl + apicDevicesUrn;
        httpDevicesOver500 = Meteor.call('apicTicket', "GET",devicesUrl,apicDevicesOptions);
        console.log("Additional documents Added to DB: ",httpDevicesOver500.data.response.length)
        httpDevicesOver500.data.response.map((data)=>{
          let normalize = data.hostname.toLowerCase();
          data.normalizeHostName = normalize;
          ItemsApicDevices.insert({
              siteData: {
                dataObj: data,
                requestTime: timeNow,
                dateTime: dateTime
              }
            });
        });
      }
      return ItemsApicDevices.find({},{fields:{
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
        "siteData.dataObj.normalizeHostName":1
      }
       })
    } else {
    console.log("APIC-EM DATABASE HAS ITEMS RETURNING DATA TO CLIENT")
    return ItemsApicDevices.find({},{fields:{
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
      "siteData.dataObj.normalizeHostName":1
    }
     })
   }
 }
});


Meteor.publish('siteCircuitInfo', function() {
  let countCollections = ItemsTransferRate.find().count();
  console.log(Meteor.call('getDateISO'));
  console.log(Meteor.call('getDnsLookup',"15g.fpi.fpir.pvt"))
  let blah = Meteor.call('getDnsLookup',"15g.fpi.fpir.pvt");
  console.log(blah)

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
