import { Meteor } from 'meteor/meteor';
import ItemsWebServerStatus from '../api/request';

let webServerStatus = (webServerObj)=>{
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
    console.log(someDate.getTime());
    return someDate.getTime();
  }
  const delayCalculator = (startTime, endTime) =>{
    let requestTime = (endTime - startTime);
    return requestTime;
  }
  let databaseObj = (name,description,url) =>{
    let tango= {
      name: name,
      description: description,
      url: url,
      statistics:{
        responseTimeTotal:"1",
        responseTimeLast:"2",
        reaponseTimeCount:"3",
        responseTimeHighest:"4",
        responseTimeLowest:"5"
      },
      httpRequest:{
        responseStatusCode:"6",
        webServerFailureStatus:"7"
      }
    }
    return tango
  };
  const poll = () => {
    webServerObj.map((data)=>{
      console.log(JSON.stringify(data, null, 2));
      const webServerMethod = "GET";
      const webServerUrl = data.url;
      const webServerOptions = {};
      const currentTime = getTimeNow();
      const dateTime = new Date();
      const startTime = getTimeNow();
      async function httpRequest(method,url,options){
        const httpDevices = await Meteor.call('httpRequest', method,url,options);
        const httpReturn = await httpDevices;
        if (await httpReturn) {
          const endTime = getTimeNow();
          //console.log("httpResonse " + data.name , httpReturn.headers);
          //console.log(httpReturn.headers.date);
          const httpReturnTime = convertDateTime(httpReturn.headers.date);
          //console.log(statusCodeParser(httpReturn.statusCode));
          const failureCode = statusCodeParser(httpReturn.statusCode);
          //console.log(httpReturnTime+" "+currentTime)
          //console.log(data.name)
          //console.log(data.url)
          //console.log(data.description)
          //console.log(httpReturn.statusCode)
          //console.log(failureCode)
          //console.log(delayCalculator(currentTime,httpReturnTime))
          //console.log("StartRaw endRaw: ", startTime+" "+endTime)
          //console.log("Start and Endtime ",delayCalculator(startTime,endTime))

          // error checking REST request. If not 200 do nothing and log
          // http status code

          // webServers name

          // language discribing the server

          // 0 returned on status code 200, 1 returned on all else

          const dBdata = databaseObj(data.name , data.description , data.url);
          const dbDataCheck = ItemsWebServerStatus.find({"webServerData.dataObj.name":data.name}).fetch();
          console.log("dataCheck : ",dbDataCheck);
          const dbInsert = (dData,cTime,dTime)=>{
            console.log("insert Attempt")
            ItemsWebServerStatus.insert({
              webServerData: {
                dataObj: dData,
                requestTime: cTime,
                dateTime: dTime
              }
            });
          }
          const dbUpdate = (dData,cTime,dTime,rTime)=>{
            console.log("insert Attempt")
            ItemsWebServerStatus.update(dbDataCheck._id, {
              $inc:{
                'reaponseTimeCount.value':1
              },
              $set:{
                'requestTime': cTime,
                'dateTime': dTime,
                'responseTimeLast': rTime
              }
            });
          }
          console.log(dBdata);
          console.log(currentTime);
          console.log(dateTime)
          if (dbDataCheck) {
            console.log("Check Passed")
            dbUpdate(dBdata,currentTime,dateTime,httpReturnTime);
          } else {
            console.log("Check Failed")
            dbInsert(dBdata,currentTime,dateTime);
          }

        }
      }
      httpRequest(webServerMethod,webServerUrl,webServerOptions)
    })
  }
  const intervalId = Meteor.setInterval(()=>{
    console.log("poll hit");
    return poll();
  },15000)
  poll()

  let debugHelper1 = "Debug helper"
  return debugHelper1;
};
const blah = (text) =>{
  let text1 = "this is blah default"
  let text2 = text
  return text1 += text2
};
export {webServerStatus,blah};
