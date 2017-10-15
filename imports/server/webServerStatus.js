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
  const totalTimeCalculator = (oldTime, newTime) =>{
    let totalTime = oldTime + newTime;
    return totalTime;
  }
  const highestTimeCalculator = (oldTime, newTime) =>{
    if (newTime > oldTime) {
      return newTime;
    } else {
      return oldTime;
    }
  }
  const lowestTimeCalculator = (oldTime, newTime) =>{
    if (newTime < oldTime) {
      return newTime;
    } else {
      return oldTime;
    }
  }
  let databaseObj = (name,description,url,rTime,rCode,fCode) =>{
    let tango= {
      name: name,
      description: description,
      url: url,
      statistics:{
        responseTimeTotal: rTime,
        responseTimeLast: rTime,
        responseTimeCount: 1,
        responseTimeHighest: rTime,
        responseTimeLowest: rTime
      },
      httpRequest:{
        responseStatusCode:rCode,
        webServerFailureStatus:fCode
      }
    };
    return tango;
  };
  const poll = () => {
    webServerObj.map((data)=>{
      console.log(JSON.stringify(data, null, 2));
      const webServerMethod = "GET";
      const webServerUrl = data.url;
      const webServerOptions = {};
      const currentTime = getTimeNow();
      const currentDateTime = new Date();
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
          const httpResponseCode = httpReturn.statusCode;
          const currentResponseTime = delayCalculator(startTime,endTime);

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


          const dbDataCheck = ItemsWebServerStatus.find({"webServerData.dataObj.name":data.name}).fetch();
          //console.log("dataCheck : ",dbDataCheck);

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
          const dbUpdate = (ddCheck,trTime,crTime,hrTime,lrTime,cTime,cdTime,)=>{
            console.log("insert Attempt");
            console.log("_id: ",ddCheck["0"]._id);
            console.log("ctime: ",cTime);
            console.log("dtime: ",cdTime);
            console.log("rtime: ",crTime);
            console.log("trTime",trTime);
            ItemsWebServerStatus.update(ddCheck["0"]._id, {
              $inc:{
                'webServerData.dataObj.statistics.responseTimeCount':1
              },
              $set:{
                'webServerData.dataObj.statistics.responseTimeTotal':trTime,
                'webServerData.dataObj.statistics.responseTimeLast':crTime,
                'webServerData.dataObj.statistics.responseTimeHighest':hrTime,
                'webServerData.dataObj.statistics.responseTimeLowest':lrTime
              }
            });
          }
          //console.log(dBdata);
          console.log("currentTime: ",currentTime);
          console.log("currentDateTime: ",currentDateTime);
          if (dbDataCheck.length >= 1) {
            console.log("Check Passed")
            const dbResponseTimeTotal = dbDataCheck["0"].webServerData.dataObj.statistics.responseTimeTotal;
            const dbHighestTime = dbDataCheck["0"].webServerData.dataObj.statistics.responseTimeHighest;
            const dbLowestTime = dbDataCheck["0"].webServerData.dataObj.statistics.responseTimeLowest;
            const totalResponseTime = totalTimeCalculator(dbResponseTimeTotal,currentResponseTime);
            const highestReponseTime = highestTimeCalculator(dbHighestTime,currentResponseTime);
            const lowestResponseTime = lowestTimeCalculator(dbLowestTime,currentResponseTime);
            dbUpdate(dbDataCheck,totalResponseTime,currentResponseTime,highestReponseTime,lowestResponseTime,currentTime,currentDateTime);
          } else {
            console.log("Check Failed")
            const dBdata = databaseObj(data.name , data.description , data.url, currentResponseTime ,httpResponseCode ,failureCode);
            dbInsert(dBdata,currentTime,currentDateTime);
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
