import { Meteor } from 'meteor/meteor';

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
  const dbObjGenerator = (name,description,url,statusCode,failureStatusCode) =>{
    console.log("hi!!");
    let dbObj = {
      name: 1,
      description: 2,
      url: 3,
      statistics:{
        responseTimeTotal:"1",
        responseTimeLast:"2",
        reaponseTimeCount:"3",
        responseTimeHighest:"4",
        responseTimeLowest:"5"
      },
      httpRequest:{
        responseStatusCode: 4,
        webServerFailureStatus: 5
      }
    };
    return dbObj;
  }
  webServerObj.map((data)=>{
    console.log(JSON.stringify(data, null, 2));
    const webServerMethod = "GET";
    const webServerUrl = data.url;
    const webServerOptions = {};
    const currentTime = getTimeNow();
    const dateTime = new Date();
    async function httpRequest(method,url,options){
      const httpDevices = await Meteor.call('httpRequest', method,url,options);
      const httpReturn = await httpDevices;
      if (await httpReturn) {
        //console.log("httpResonse " + data.name , httpReturn.headers);
        console.log(httpReturn.headers.date);
        const httpReturnTime = convertDateTime(httpReturn.headers.date);
        console.log(statusCodeParser(httpReturn.statusCode));
        const failureCode = statusCodeParser(httpReturn.statusCode);
        console.log(httpReturnTime+" "+currentTime)
        console.log(data.name)
        console.log(data.url)
        console.log(data.description)
        console.log(httpReturn.statusCode)
        console.log(failureCode)
        console.log(delayCalculator(currentTime,httpReturnTime))

        // error checking REST request. If not 200 do nothing and log
        // http status code

        // webServers name

        // language discribing the server

        // 0 returned on status code 200, 1 returned on all else

        let databaseObj = (name,description,url) =>{

          let tango= {
            name: name,
            description: description,
            url: url,
            trash:"trash1231312"
          }
          return tango
        };

        console.log(databaseObj(data.name,data.description,data.url))

        const dbInsert = ()=>{
          ItemsWebServerStatus.insert({
            siteData: {
              dataObj: databaseObj,
              requestTime: currentTime,
              dateTime: dateTime
            }
          });
        }
      }
    }
    httpRequest(webServerMethod,webServerUrl,webServerOptions)
  })
  let debugHelper1 = "Debug helper"
  return debugHelper1;
};
const blah = (text) =>{
  let text1 = "this is blah default"
  let text2 = text
  return text1 += text2
};
export {webServerStatus,blah};
