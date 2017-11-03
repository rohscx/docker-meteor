import { Meteor } from 'meteor/meteor';
import ItemsApicDevices from '../api/apic';

let apicDevices = ()=>{
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
  const apicRoleUrn = '/api/v1/user/role';
  const roleUrl = baseUrl + apicRoleUrn;
  const apicTicketUrn = '/api/v1/ticket';
  const ticketUrl = baseUrl + apicTicketUrn;
  const apicTicketOptions = {
    headers: { 'content-type': 'application/json' },
    data: {username: uName, password: uPass}
  }
  // commands to be run against apic device. No more than 5  per arrays e.g. [0,1,2,3,4]
  const downPortCommandArray = [
      "show int | i proto.*notconnect|proto.*administratively down|Last in.* [6-9]w|Last in.*[0-9][0-9]w|[0-9]y|disabled|Last input never, output never, output hang never"
  ];
  let apicDevicesUrn = "/api/v1/network-device";
  let devicesUrl = baseUrl + apicDevicesUrn;
  let ticketIdleTimeout = 0;
  let ticketSessionTimeout = 0;
  let oldApicTicket = "";

  const statusCodeParser = (statusCode) =>{
    if (statusCode === 200) {
      return 0;
    } else {
      return 1;
    }
  }
  const getTimeNow = () =>{
    return new Date().getTime()
  }
  const convertDateTime = (dateString) =>{
    let someDate = new Date(dateString);
    //console.log(someDate.getTime());
    return someDate.getTime();
  }
  const apicOptions = (bodyObj) => {
    const apicTicket = ()=>{
      const setTimeouts = (idleTimeout,sessionTimeout) =>{
        ticketIdleTimeout = timeNow() + idleTimeout;
        ticketSessionTimeout = timeNow() + sessionTimeout;
        //console.log("Ticket timeout <Time Now: Idle/Session> ",timeNow()+": "+ticketIdleTimeout+"/"+ticketSessionTimeout);
        //console.log("Requesting New ticket: ", oldApicTicket)
      }
      if (ticketIdleTimeout === 0 && ticketSessionTimeout === 0 ){
        let httpRequest = Meteor.call('apicTicket', "POST",ticketUrl,apicTicketOptions);
        if (httpRequest.data.response.serviceTicket !== undefined) {
          oldApicTicket = httpRequest.data.response.serviceTicket;
          setTimeouts(1800,21600);
          console.log("###-New Ticket: ",oldApicTicket)
          console.log("###-Ticket timeout <Time Now: Idle/Session> ",timeNow()+": "+ticketIdleTimeout+"/"+ticketSessionTimeout);
          return httpRequest.data.response.serviceTicket;
        } else {
          return null;
        }

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
      },
      data: bodyObj
    }
    return requestObj;
  };

  const checkUserRole = (method,url,options) =>{
    const httpUserRole = Meteor.call('httpRequest', method,url,options);
    const userRole = httpUserRole;
    if (userRole.statusCode === 200) {
      //console.log("hit")
      //console.log(userRole.data.response)
      return userRole.data.response;
    } else {
      return userRole;
    }
  }
  // gets user roles as Array
  const roleStatus = checkUserRole("GET",roleUrl,apicOptions(""));

  async function httpRequest(method,url,options){
    const httpDevices = await Meteor.call('httpRequest', method,url,options);
    const apicDevices = await httpDevices;
    // error checking REST request. If not 200 do nothing and log
    if (await apicDevices.statusCode === 200) {
      // itterate over object
      return await Promise.all(apicDevices.data.response.map((data,index)=>{
        // debug
        //console.log(apicDevices)
        const managementIpAddress = data.managementIpAddress;
        const deviceId = data.id;
        const lastUpdateTime = data.lastUpdateTime;
        const dataCheck = ItemsApicDevices.find({"siteData.dataObj.managementIpAddress":managementIpAddress}).fetch();
        const normalize = data.hostname ? data.hostname.toLowerCase() : "Null";
        // adds normalized name for easier searching
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
        const interfaceInfo = ()=>{
          if ((data.family == "Switches and Hubs" || data.family == "Routers") && data.errorCode === null){
            const interfaceInfoUrl = baseUrl + "/api/v1/interface/network-device" +"/"+ data.id;
            const interfaceInfoCall = Meteor.call('apicHttpRequest',"GET",interfaceInfoUrl,options);
            if (interfaceInfoCall.statusCode == 200){
              return data.interfaceDetail = interfaceInfoCall.data.response;
            }
          }
        }
        const licenseInfo = ()=>{
          if ((data.family == "Switches and Hubs" || data.family == "Routers") && data.errorCode === null){
            const licenseInfoUrl = baseUrl + "/api/v1/license-info/network-device" +"/"+ data.id;
            const licenseInfoCall = Meteor.call('apicHttpRequest',"GET",licenseInfoUrl,options);
            if (licenseInfoCall.statusCode == 200){
              return data.licenseDetail = licenseInfoCall.data.response;
            }
          }
        }
        const showCommands = (commandArray,uUids)=>{
          const taskStatus = (taskUrl) =>{
            const taskStausCall = Meteor.call('apicHttpRequest',"GET",taskUrl,apicOptions(""));
            console.log(taskStausCall)
          }
          if (roleStatus[0].role =="ROLE_ADMIN" ){
            //console.log(roleStatus[0].role)
            //console.log(commandArray,uUids)
            const commandRunnerDTO = {
              "name": "",
              "description": "",
              "timeout": 0,
              "commands": commandArray,
              "deviceUuids": [uUids]
            };
            const networkDevicePoller = baseUrl + "/api/v1/network-device-poller/cli/read-request";
            //console.log(networkDevicePoller)
            //console.log(commandRunnerDTO)
            //console.log(networkDevicePoller)
            //console.log(apicOptions(commandRunnerDTO))
            const networkDevicePollerCall = Meteor.call('apicHttpRequest',"POST",networkDevicePoller,apicOptions(commandRunnerDTO));
            //console.log(networkDevicePollerCall)
            //console.log(networkDevicePollerCall.statusCode)
            if (networkDevicePollerCall.statusCode == 202){
              //console.log(networkDevicePollerCall.data.response)
              //console.log(networkDevicePollerCall.data.response.url)
              const networkDevicePollerStatus = baseUrl + networkDevicePollerCall.data.response.url;
              console.log(networkDevicePollerStatus)
              //return data.licenseDetail = licenseInfoCall.data.response;
            }
            /*const licenseInfoUrl = baseUrl + "/api/v1/license-info/network-device" +"/"+ data.id;
            const licenseInfoCall = Meteor.call('apicHttpRequest',"GET",licenseInfoUrl,options);
            */
          }
        }
        const dbInsert = (dbData)=>{
          // debug
          //console.log("dbInsert index Hit: ",index)
          ItemsApicDevices.insert({
            siteData: {
              dataObj: dbData,
              requestTime: timeNow(),
              dateTime: dateTime
            }
          });
        }
        const dbUpdate = (ddCheck,dbData,cTime,cdTime)=>{
          ItemsApicDevices.update(ddCheck, {
            $set:{
              'siteData.dataObj':dbData,
              'siteData.requestTime':cTime,
              'siteData.dateTime':cdTime
            }
          });
        }
        const dbTasks = () =>{
        async function restDataHandler(){
          const dbMatch = await findItem(deviceId);
          if (await dbMatch === undefined) {
            // debug
            //console.log("undefined")
            ItemsApicDevices.remove({"siteData.dataObj.id":deviceId});
            vlanDetail();
            interfaceInfo();
            licenseInfo();
            dbInsert(data);
            // if there is a match compare the lastUpdateTimes, if they match it skips
          } else if (dbMatch.siteData.dataObj.lastUpdateTime == lastUpdateTime){
            // debug
            //console.log("Match Found",dbMatch.siteData.dataObj.lastUpdateTime);
            //console.log("equality")
            // remove matches that fail the lastUpdateTime comparison
          } else {
            // database Item ID
            const dbDataID = dbMatch._id;
            // debug
            //console.log("unequal")
            vlanDetail();
            interfaceInfo();
            licenseInfo();
            showCommands(downPortCommandArray,deviceId);
            dbUpdate(dbDataID,data,timeNow(),dateTime);
          }
        };
        //ItemsApicDevices.remove({"siteData.dataObj.managementIpAddress":managementIpAddress,"siteData.dataObj.lastUpdateTime":{"$lte":lastUpdateTime}});
        restDataHandler()
        }
        dbTasks();
      }))
    } else {
      console.log("REST FAILURE: ", apicDevices);
    }
  }
  const poll = () => {
      console.log("requesting upto 500 objects from APIC-EM")
      console.log()

      httpRequest("GET",devicesUrl,apicOptions(""))
      if (countCollections() >= 300){
        console.log("over 9000!!! actually it's only only over 300 Devices!!!",countCollections())
        console.log("requesting upto ANOTHER 500 objects from APIC-EM")
        apicDevicesUrn500 = baseUrl+"/api/v1/network-device/501/500";
        httpRequest("GET",apicDevicesUrn500,apicOptions(""))
      }
  }
  const intervalId = Meteor.setInterval(()=>{
    counter++;
    console.log("Apic Data Publish on client Counter: %s",counter);
    return poll();
  },300000)
  poll()
};
export {apicDevices};
