import { Meteor } from 'meteor/meteor';

const webServerStatus = (webServerObj)=>{
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
    return someDate.getTime();
  }
  webServerObj.map((data)=>{
    const webServerMethod = "GET";
    const webServerUrl = data.webServerUrl;
    const webServerOptions = {};
    const currentTime = getTimeNow()
    const dateTime = new Date();
    async function httpRequest(method,url,options){
      const httpDevices = await Meteor.call('httpRequest', method,url,options);
      const httpReturn = await httpDevices;
      const httpReturnTime = convertDateTime(httpReturn.date);
      // error checking REST request. If not 200 do nothing and log
      // http status code

      // webServers name

      // language discribing the server

      // 0 returned on status code 200, 1 returned on all else

      let dataBaseObj = {
        name: data.name,
        description: data.description,
        url: date.url,
        statistics:{
          responseTimeTotal:"1",
          responseTimeLast:"2",
          reaponseTimeCount:"3",
          responseTimeHighest:"4",
          responseTimeLowest:"5"
        },
        httpRequest:{
          responseStatusCode: httpReturn.statusCode,
          webServerFailueStatus: statusCodeParser(httpReturn.statusCode)
        }
      }

      const dbInsert = ()=>{
        ItemsWebServerStatus.insert({
          siteData: {
            dataObj: dataBaseObj,
            requestTime: currentTime,
            dateTime: dateTime
          }
        });
      }
      console.log(dataBaseObj)
    }
  })
};
export default webServerStatus;
