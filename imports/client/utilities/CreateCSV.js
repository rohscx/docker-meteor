import React, { PropTypes} from 'react';

const CreateCSV = (csvData,switchExpression) => {
  // Debug
  //console.log("fileText ", csvData)
  // Debug
  //console.log("RUNNING REPORT csvDownInterfaces");
  switch(switchExpression){
    case "apicDownInterfaces":
    let columnHeaderArray = ["hostName","className","adminStatus","status","duplex","portName"];
    let colummRowArray = [];
    let fileString = "";
    const timeNow = (divisor) =>{
      return Math.round(new Date().getTime() / divisor);
    };
    const noDataError = "Nothing found in time range";
    csvData.map((item) => {
      item.siteData.dataObj.interfaceDetail.map((item2) => {
        // 86400000 ms in one day
        if (item2.status == "down" && (item2.downAsOf + (86400000 * 2)  <  timeNow(1))){
          let tempArray = [];
          tempArray.push(item.siteData.dataObj.hostname);
          tempArray.push(item2.className);
          tempArray.push(item2.adminStatus);
          tempArray.push(item2.status);
          tempArray.push(item2.duplex);
          tempArray.push(item2.portName);
          colummRowArray.push(tempArray);
        } else {
          // do nothing
        }
      })
    })
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
    break;
  }
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
