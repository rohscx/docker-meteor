process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { HTTP } from 'meteor/http'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import request from 'request';
import https from 'https';
import tempData from '../../server/tempData';

// apic

const ItemsApicDevices = new Mongo.Collection('itemapicdevices');
// simple schema debug
SimpleSchema.debug = true
const ItemTransferRateSchema = new SimpleSchema ({
  dataObj: {
    type: Object,
    blackbox: true
  },
  requestTime: SimpleSchema.Integer,
  dateTime : {
    type: Date
  }
});


const ItemsApicDevicesSchema = new SimpleSchema ({
  siteData: ItemTransferRateSchema
});

ItemsApicDevices.attachSchema(ItemsApicDevicesSchema);


if (Meteor.isServer) {
  Meteor.methods({
    apicTicket(type, url, options) {
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
    apicHttpRequest(type, url, options) {
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
    apicDbRemove(dbID,uuid) {
      try {
        const result = ItemsApicDevices.remove(dbID);
        // console.log(result); // debug
        return result;
      } catch (e) {
        // Got a network error, timeout, or HTTP error in the 400 or 500 range.
        console.log(e) // debug
        return e;
      };
    },
    apicShowCommands(showCommand,uuid) {
      try {
        showObj = {
          "name":"testTest123",
          "tieout":0,
          "description":"",
          "commands":[
            showCommand
          ],
          "deviceUuids":[
            uuid
          ]
        }
        const timeNow = (divisor) =>{
          return Math.round(new Date().getTime() / divisor);
        }
        const dateTime = new Date();
        const baseUrl = Meteor.settings.private.apicEM.uName ? Meteor.settings.private.apicEM.baseUrl : Meteor.settings.public.ciscoApicEM.baseUrl;
        const uName = Meteor.settings.private.apicEM.uName ? Meteor.settings.private.apicEM.uName : Meteor.settings.public.ciscoApicEM.uName;
        const uPass = Meteor.settings.private.apicEM.uName ? Meteor.settings.private.apicEM.uPass : Meteor.settings.public.ciscoApicEM.uPass;
        const apicRoleUrn = '/api/v1/user/role';
        const roleUrl = baseUrl + apicRoleUrn;
        const apicTicketUrn = '/api/v1/ticket';
        const ticketUrl = baseUrl + apicTicketUrn;
        const apicTicketOptions = {
          headers: { 'content-type': 'application/json' },
          data: {username: uName, password: uPass}
        };
        const networkDevicePoller = baseUrl + "/api/v1/network-device-poller/cli/read-request";
        let ticketIdleTimeout = 0;
        let ticketSessionTimeout = 0;
        let oldApicTicket = "";
        // creates dataBlob for an HTTPs request. creates and reuses apicTickets, tickets for the same request are reused.
        const apicOptions = (bodyObj) => {
          const apicTicket = ()=>{
            const setTimeouts = (idleTimeout,sessionTimeout) =>{
              ticketIdleTimeout = timeNow(1000) + idleTimeout;
              ticketSessionTimeout = timeNow(1000) + sessionTimeout;
              //console.log("Ticket timeout <Time Now: Idle/Session> ",timeNow(1000)+": "+ticketIdleTimeout+"/"+ticketSessionTimeout);
              //console.log("Requesting New ticket: ", oldApicTicket)
            }
            if (ticketIdleTimeout === 0 && ticketSessionTimeout === 0 ){
              let httpRequest = Meteor.call('apicTicket', "POST",ticketUrl,apicTicketOptions);
              if (httpRequest.data.response.serviceTicket !== undefined) {
                oldApicTicket = httpRequest.data.response.serviceTicket;
                setTimeouts(1800,21600);
                console.log("###-New Ticket: ",oldApicTicket)
                console.log("###-Ticket timeout <Time Now: Idle/Session> ",timeNow(1000)+": "+ticketIdleTimeout+"/"+ticketSessionTimeout);
                return httpRequest.data.response.serviceTicket;
              } else {
                return null;
              }

            } else if (timeNow(1000) >= ticketIdleTimeout || timeNow(1000) >= ticketSessionTimeout){
              let httpRequest = Meteor.call('apicTicket', "POST",ticketUrl,apicTicketOptions);
              oldApicTicket = httpRequest.data.response.serviceTicket;
              setTimeouts(1800,21600);
              console.log("***-Ticket expired requesting new Ticket: ",oldApicTicket)
              console.log("***-Ticket timeout <Time Now: Idle/Session> ",timeNow(1000)+": "+ticketIdleTimeout+"/"+ticketSessionTimeout);
              return httpRequest.data.response.serviceTicket;
            } else {
              //console.log("Using Existing Ticket: ",oldApicTicket)
              //console.log("Ticket timeout <Time Now: Idle/Session> ",timeNow(1000)+": "+ticketIdleTimeout+"/"+ticketSessionTimeout);
              return oldApicTicket;
            }
          }
          // this is the request body
          const requestObj = {
            headers: {
              'content-type': 'application/json',
              'x-auth-token': apicTicket()
            },
            data: bodyObj
          }
          return requestObj;
        };
        console.log(apicOptions(showObj))
        console.log();

        let responseTaskID = Meteor.call('apicHttpRequest',"POST",networkDevicePoller,apicOptions(showObj))
        let responseTaskURL = baseUrl + responseTaskID.data.response.url;
        console.log("*****"+responseTaskURL);
        let responseFileURL = "";
        // initial state of the while loop
        let undefinedCounter = 0;
        // the while loop runs until this condition is met
        while (undefinedCounter < 600){
          undefinedCounter++
          console.log("waiting... Try:", undefinedCounter)
          const x = ()=>{
            let promise = new Promise((resolve, reject)=>{
              let responseFileId = Meteor.call('apicHttpRequest',"GET",responseTaskURL,apicOptions(showObj))
              resolve(responseFileId)
            })
            return promise;
          }
          x().then((data)=>{
            //console.log(data.data.response.progress);
            if (data.data.response.progress != undefined && data.data.response.progress != "CLI Runner request creation"){
              // this breaks the while loop
              undefinedCounter = 800;
              console.log("***AAA** ",data.data.response.progress)
              console.log("***BBB** ",JSON.parse(data.data.response.progress))
              let stringToJSON=JSON.parse(data.data.response.progress);
              //console.log("***** ",data.data.response);

              responseFileURL = baseUrl +"/api/v1/file/"+stringToJSON.fileId;
              //console.log(responseFileURL)

              //return Meteor.call('apicHttpRequest',"GET",responseFileURL,apicOptions(showObj));
            }
          });
        }
        console.log("responseFileURL",responseFileURL)

          let test = Meteor.call('apicHttpRequest',"GET",responseFileURL,apicOptions(showObj));
          console.log(test)
          console.log("*****",JSON.parse(test.content))
          let man2 = JSON.parse(test.content)
          console.log(man2[0].commandResponses)
          return JSON.stringify(man2[0].commandResponses['SUCCESS']);

         //console.log(test)

        //console.log(Meteor.call('apicHttpRequest',"GET",responseFileURL,""))
        //return apicOptions(showObj)
      } catch (e) {
        // Got a network error, timeout, or HTTP error in the 400 or 500 range.
        console.log(JSON.stringify(e)) // debug
        return e;
      }
    }

  });
}


export default ItemsApicDevices;
