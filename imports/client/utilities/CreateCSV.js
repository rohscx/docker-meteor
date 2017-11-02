import React, { PropTypes} from 'react';

const CreateCSV = (csvData) => {
  console.log("fileText ", csvData)
  console.log("RUNNING REPORT csvDownInterfaces");
  //let csvData = this.props.dbSearch({"siteData.dataObj.interfaceDetail":{"$exists":true}},{sort:{"siteData.dataObj.hostname":-1}})
  //console.log(csvData)

  let columnHeaderArray = ["hostName","className","adminStatus","status","duplex","portName"];
  let colummRowArray = [];
  let fileString = "";
  csvData.map((item) => {
    item.siteData.dataObj.interfaceDetail.map((item2) => {
      if (item2.status == "down") {
        let tempArray = [];
        tempArray.push(item.siteData.dataObj.hostname);
        tempArray.push(item2.className);
        tempArray.push(item2.adminStatus);
        tempArray.push(item2.status);
        tempArray.push(item2.duplex);
        tempArray.push(item2.portName);
        colummRowArray.push(tempArray);
      }
    })
  })
  //console.log(columnHeaderArray)
  //console.log(colummRowArray)
  fileString += columnHeaderArray.toString();
  fileString += "\r";
  colummRowArray.map((item) => {
    fileString += item.toString();
    fileString += "\r";
  })
  console.log(fileString)
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
