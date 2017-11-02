import React, {Component} from 'react';
import { Session } from 'meteor/session';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, FormControl, DropdownButton, MenuItem, ButtonToolbar, Button } from 'react-bootstrap';
import { hostName, getDevices } from '../actions/prtgActions';
import Layout from './ApicDevices/Layout';
import { sortBy, apicDevicesFind, apicDbReady } from '../actions/apicActions';
import { fiaTrace } from '../actions/utilActions'
import FileDownload from '../utilities/FileDownload'
import ExportButton from '../utilities/ExportButton'

class ApicDevices extends Component {
  constructor() {
    super();
    this.state = {
    }
  }
  handleSearchFormInput(event) {
    let value = event.target.value;
    let deviceFilter = "ALL"
    this.props.apicDevicesFind(value,deviceFilter,"cats");
    // resets auto loading div to default display amount
    this.props.setDbFindLimit(15)
  }

  preventDefault(e){
    e.preventDefault();
  }

  getDevices(){
    this.props.getDevices();
  }

  setByteType(data){
    let value = this.props.util.bandwidthCalcData.number;
    let byteType = data;
    this.props.bandwidthCalc(value,byteType,null);
  }

  setSortBy(sortName, sortOrder){
    this.props.sortBy(sortName, sortOrder)
  }

  preventDefault(e){
    e.preventDefault();
  }

  getDevices(){
    this.props.getDevices();
  }

  csvDownInterfaces (){
    console.log("RUNNING REPORT csvDownInterfaces");
    let blah = this.props.dbSearch({"siteData.dataObj.interfaceDetail":{"$exists":true}},{sort:{"siteData.dataObj.hostname":-1}})
    //console.log(blah)

    let columnHeaderArray = ["hostName","className","adminStatus","status","duplex","portName"];
    let colummRowArray = [];
    let fileString = "";
    blah.map((item) => {
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
    return fileString;
  }

  downloadData(){
    //FileDownload("downInterfaces.csv","RandomeDatadadsfasdf asdnd Stuff")
    //this.props.dbSearch({"siteData.dataObj.vlanDetail.ipAddress":"10.204.61.1"},{fields:{"siteData._id":1}})  a
    return (
      <ExportButton {...this.props} fileName = "downInterfaces.csv" fileData = {this.csvDownInterfaces.bind(this)}/>
    )
    /*
    return (
      <div>
        <ButtonToolbar>
          <Button bsStyle="primary" bsSize="xsmall">DownloadDataTest1234</Button>
        </ButtonToolbar>
      </div>
    )
    */
    //return <FileDownload fileName="dataDownload.csv" fileText="RandomeDatadadsfasdf asdnd Stuff"/>
  }

  form(){
    const btnEnabled = () => {
      return (
        <Col smOffset={2} sm={10}><Button type="button" bsStyle="primary" block>Submit</Button></Col>
      );
    };
    const btnDisabled = () => {
      return (
        <Col smOffset={2} sm={10}><Button  type="button" disabled block> <b> . . . </b></Button></Col>
      );
    };
    const hostName = () => {
      return (
        this.props.util.hostName.name
      );
    };
    const formInput = () => {
      return (
        this.handleSearchFormInput.bind(this)
      );
    };
    const validationStatus = () => {
      let dataReturn = this.props.apic.apicDevicesFind.deviceName;
      let dataReady = this.props.apic.apicDevicesFind.validationStatus;
      let dataValueCheck = dataReturn ? 10 : ""
      if(dataReady === null){
        return null;
      } else if (dataReady === false){
        return "error";
      } else {
        return "success";
      }
    };

    const divStyles = {
      margin: "auto",
      width: "40%"
    };
    let sortField = this.props.apic.sortBy.field;
    let buttonLabel = (textValue)=>{
      switch(textValue){
        case "hostname":
        return "HostName";
      break;
        case "reachabilityStatus":
        return "Reachability";
      break;
        case "upTime":
        return "UpTime";
      break;
      case "softwareVersion":
      return "IOS Version";
    break;
      }
    };
    return (
      <div style={divStyles}>
        <form onSubmit= {e =>{this.preventDefault(e)}}>
          <FormGroup  validationState={validationStatus()}>
             <InputGroup>
               <FormControl placeholder="Enter Device Name..." type="text" onChange={formInput()}/>
               <DropdownButton
                 componentClass={InputGroup.Button}
                 id="input-dropdown-addon"
                 title={buttonLabel(sortField)}
               >
                 <MenuItem key="1" onSelect= {()=>{this.setSortBy("hostname",1)}}>HostName</MenuItem>
                 <MenuItem key="2" onSelect= {()=>{this.setSortBy("reachabilityStatus",-1)}}>Reachability</MenuItem>
                 <MenuItem key="3" onSelect= {()=>{this.setSortBy("upTime",1)}}>UpTime</MenuItem>
                 <MenuItem key="4" onSelect= {()=>{this.setSortBy("softwareVersion",1)}}>IOS Version</MenuItem>
               </DropdownButton>
             </InputGroup>
           </FormGroup>
        </form>
      </div>
    );
  }



  render() {
    const divStyles = {
      paddingBottom:"5%"
    };
    console.log(this);
    return(
      <div style={divStyles}>
        {this.form()}
        {this.downloadData()}
        <Layout {... this.props}/>
      </div>
    )
  }
}

const mapSateToProps = (state) => {
  return {
    util: state.utilReducer,
    apic: state.apicReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    apicDevicesFind: (deviceName,deviceFilter,cdase) => {
      dispatch(apicDevicesFind(deviceName,deviceFilter,cdase));
    },
    sortBy: (sortValue, sortOrder) => {
      dispatch(sortBy(sortValue, sortOrder));
    },
    apicDbReady: (status) => {
      dispatch(apicDbReady(status));
    },
    fiaTrace: (srcIp, dstIp, srcInt) => {
      dispatch(fiaTrace(srcIp, dstIp, srcInt));
    },
  };
};
export default connect(mapSateToProps, mapDispatchToProps) (ApicDevices);
