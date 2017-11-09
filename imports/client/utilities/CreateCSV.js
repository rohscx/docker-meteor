import React, { PropTypes} from 'react';

const CreateCSV = (csvData,switchExpression) => {
  const noDataError = "Nothing found in time range";
  let fileString = "";
  let columnHeaderArray = [];
  let colummRowArray = [];
  const convertDateToReadable = (dateInMiliseconds) =>{
    const dateReadable = new Date(dateInMiliseconds)
    // debug
    //console.log(dateInMiliseconds);
    //console.log(dateReadable);
    return dateReadable;
  }
  const timeNow = (divisor) =>{
    return Math.round(new Date().getTime() / divisor);
  };
  // Debug
  //console.log("fileText ", csvData)
  // Debug
  //console.log("RUNNING REPORT csvDownInterfaces");
  switch(switchExpression){
    case "downInterfaces(raw).csv":
    columnHeaderArray = ["hostName","className","adminStatus","status","portName"];
    csvData.map((item) => {
      item.siteData.dataObj.interfaceDetail.map((item2) => {
        // 86400000 ms in one day
        if (item2.status == "down"){
          let tempArray = [];
          tempArray.push(item.siteData.dataObj.hostname);
          tempArray.push(item2.className);
          tempArray.push(item2.adminStatus);
          tempArray.push(item2.status);
          tempArray.push(item2.portName);
          colummRowArray.push(tempArray);
        } else {
          // do nothing
        }
      })
    })
    break;
    case "downInterfaces(protracted).csv":
    columnHeaderArray = ["hostName","className","adminStatus","status","downAsof","portName"];
    csvData.map((item) => {
      item.siteData.dataObj.interfaceDetail.map((item2) => {
        // 86400000 ms in one day
        // debug
        /*
        if (item2.status == "down"){
          console.log("date ",convertDateToReadable(item2.downAsOf))
          console.log("date **** ",item2.downAsOf)
          console.log(item2.status == "down")
        }
        */
        if (item2.status == "down" && (item2.downAsOf + (86400000 * 2)  <  timeNow(1))){
          let tempArray = [];
          tempArray.push(item.siteData.dataObj.hostname);
          tempArray.push(item2.className);
          tempArray.push(item2.adminStatus);
          tempArray.push(item2.status);
          tempArray.push(item2.status);
          tempArray.push(convertDateToReadable(item2.downAsOf));
          colummRowArray.push(tempArray);
        } else {
          // do nothing
        }
      })
    })
    break;
    case "downInterfaces(switches).csv":
    columnHeaderArray = ["hostName","className","adminStatus","status","portName"];
    csvData.map((item) => {
      item.siteData.dataObj.interfaceDetail.map((item2) => {
        // 86400000 ms in one day
        if (item.siteData.dataObj.family == "Switches and Hubs" &&
        (item2.status == "down" && (item2.className != "EthrntPrtclEndpntExtndd" && item2.className != "VLANInterfaceExtended"))){
          let tempArray = [];
          tempArray.push(item.siteData.dataObj.hostname);
          tempArray.push(item2.className);
          tempArray.push(item2.adminStatus);
          tempArray.push(item2.status);
          tempArray.push(item2.portName);
          colummRowArray.push(tempArray);
        } else {
          // do nothing
        }
      })
    })
    break;
    case "halfDuplexInterfaces(switches).csv":
    columnHeaderArray = ["hostName","className","adminStatus","status","duplex","description","portName"];
    csvData.map((item) => {
      item.siteData.dataObj.interfaceDetail.map((item2) => {
        // 86400000 ms in one day
        if (item.siteData.dataObj.family == "Switches and Hubs" && ((item2.status == "up" && item2.interfaceType == "Physical") &&
        (item2.duplex != "FullDuplex" && item2.duplex != "AutoNegotiate"))){
          let tempArray = [];
          tempArray.push(item.siteData.dataObj.hostname);
          tempArray.push(item2.className);
          tempArray.push(item2.adminStatus);
          tempArray.push(item2.status);
          tempArray.push(item2.duplex);
          tempArray.push(item2.description);
          tempArray.push(item2.portName);
          colummRowArray.push(tempArray);
        } else {
          // do nothing
        }
      })
    })
    break;
    case "accessPoints(raw).csv":
    columnHeaderArray = ["hostName","series","reachablityStatus","softwareVersion","serialNumber",];
    csvData.map((item) => {
      item.siteData.dataObj.interfaceDetail.map((item2) => {
        // 86400000 ms in one day
        if (item.siteData.dataObj.family == "Unified AP"){
          let tempArray = [];
          tempArray.push(item.siteData.dataObj.hostname);
          tempArray.push(item2.series);
          tempArray.push(item2.reachablityStatus);
          tempArray.push(item2.softwareVersion);
          tempArray.push(item2.serialNumber);
          colummRowArray.push(tempArray);
        } else {
          // do nothing
        }
      })
    })
    break;
  }
  // Debug
  //console.log(columnHeaderArray)
  // Debug
  //console.log(colummRowArray)
  fileString += columnHeaderArray.toString();
  fileString += "\r";
  colummRowArray.map((item) => {
    fileString += item.toString();
    fileString += "\r";
  })
  // Debug
  //console.log(fileString)
  return fileString;
}
/*
// checks type, throws and error
MgmtIp.propTypes = {
  role: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
};
*/
export default CreateCSV;
