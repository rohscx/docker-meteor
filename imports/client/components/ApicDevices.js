import React, {Component} from 'react';
import { Session } from 'meteor/session';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, FormControl, DropdownButton, MenuItem, ButtonToolbar, Button, ButtonGroup,SplitButton } from 'react-bootstrap';
import { hostName, getDevices } from '../actions/prtgActions';
import Layout from './ApicDevices/Layout';
import DeviceTypeCountBar from './CountBar/DeviceTypeCountBar';
import { sortBy, apicDevicesFind, apicDbReady, apicShowCommands, apicShowCommandsResponse} from '../actions/apicActions';
import { fiaTrace } from '../actions/utilActions';
import FileDownload from '../utilities/FileDownload';
import ExportButton from '../utilities/ExportButton';
import CreateCSV from '../utilities/CreateCSV';
import ApicModal from './ApicDevices/ApicModal';

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

  setApicShowCommands(showCommand, deviceId, validationStatus){
    this.props.apicShowCommands(showCommand, deviceId, validationStatus);
  }

  setApicShowCommandsResponse(commandResponse){
    this.props.apicShowCommandsResponse(commandResponse);
  }

  preventDefault(e){
    e.preventDefault();
  }

  getDevices(){
    this.props.getDevices();
  }

  csvInterfaces (switchExpression){
    const rawObj = this.props.dbSearch({"siteData.dataObj.interfaceDetail":{"$exists":true}},{sort:{"siteData.dataObj.hostname":-1}})
    //const switchExpression = "downInterfaces.csv";
    if (rawObj.length >= 1) {
      return CreateCSV(rawObj,switchExpression)
    }
  }

  csvAccessPoints (switchExpression){
    const rawObj = this.props.dbSearch({"siteData.dataObj.family":"Unified AP"},{sort:{"siteData.dataObj.hostname":-1}})
    //const switchExpression = "downInterfaces.csv";
    if (rawObj.length >= 1) {
      return CreateCSV(rawObj,switchExpression)
    }
  }

  csvVlans (switchExpression){
    const rawObj = this.props.dbSearch({"siteData.dataObj.vlanDetail":{"$exists":true}},{sort:{"siteData.dataObj.hostname":-1}})
    //const switchExpression = "downInterfaces.csv";
    if (rawObj.length >= 1) {
      return CreateCSV(rawObj,switchExpression)
    }
  }

  downloadData(){
    //FileDownload("downInterfaces.csv","RandomeDatadadsfasdf asdnd Stuff")
    //this.props.dbSearch({"siteData.dataObj.vlanDetail.ipAddress":"10.204.61.1"},{fields:{"siteData._id":1}})  a
    return (
      <div>
        <ButtonToolbar>
          <ExportButton {...this.props} fileName = "downInterfaces(raw).csv" fileData = {this.csvInterfaces.bind(this)}/>
          <ExportButton {...this.props} fileName = "downInterfaces(protracted).csv" fileData = {this.csvInterfaces.bind(this)}/>
          <ExportButton {...this.props} fileName = "downInterfaces(switches).csv" fileData = {this.csvInterfaces.bind(this)}/>
          <ExportButton {...this.props} fileName = "halfDuplexInterfaces(switches).csv" fileData = {this.csvInterfaces.bind(this)}/>
          <ExportButton {...this.props} fileName = "accessPoints(raw).csv" fileData = {this.csvAccessPoints.bind(this)}/>
          <ExportButton {...this.props} fileName = "vlans(routers).csv" fileData = {this.csvVlans.bind(this)}/>
        </ButtonToolbar>
      </div>
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
                 <MenuItem key="1" onSelect={()=>{this.setSortBy("hostname",1)}}>HostName</MenuItem>
                 <MenuItem key="2" onSelect={()=>{this.setSortBy("reachabilityStatus",-1)}}>Reachability</MenuItem>
                 <MenuItem key="3" onSelect={()=>{this.setSortBy("upTime",1)}}>UpTime</MenuItem>
                 <MenuItem key="4" onSelect={()=>{this.setSortBy("softwareVersion",1)}}>IOS Version</MenuItem>
               </DropdownButton>
             </InputGroup>
           </FormGroup>
        </form>
      </div>
    );
  }

  showCommandButton(deviceID) {
    const showC = this.props.apic.apicShowCommands.showCommand;
    const deviceI = this.props.apic.apicShowCommands.deviceId;
    const validS = this.props.apic.apicShowCommands.validationStatus;
    const commandRunner = (scmd,uuid) =>{
      console.log(scmd)
      console.log(uuid)
      const commandData = Meteor.call('apicShowCommands',scmd,uuid, function(error, result){
        if (error){
          console.log(error)
        } else {
          console.log(this)
          console.log(result)
          return result
        }

      });
    }
    return (

      <SplitButton bsSize="xsmall" title="Commands" id="split-button-dropdown" onClick={()=>{this.setApicShowCommandsResponse(commandRunner(showC,deviceI))}}>
          <MenuItem eventKey="1" onSelect={()=>{this.setApicShowCommands("show Clock",deviceID,1)}}>showClock</MenuItem>
          <MenuItem eventKey="2" onSelect={()=>{this.setApicShowCommands("show standby brief",deviceID,2)}}>showHSRP</MenuItem>
          <MenuItem eventKey="3" onSelect={()=>{this.setApicShowCommands("show run | i hostname",deviceID,3)}}>showHostname</MenuItem>
          <MenuItem eventKey="4" onSelect={()=>{this.setApicShowCommands("show ver | i model number",deviceID,4)}}>showModelNumber</MenuItem>
      </SplitButton>

    )
  }


  render() {
    const divStyles = {
      paddingBottom:"5%"
    };
    console.log(this);
    return(
      <div style={divStyles}>
        <div id="example"><ApicModal></ApicModal></div>

        {this.form()}
        <DeviceTypeCountBar {... this.props}/>
        <div style={{float:"right"}}>
          {this.downloadData()}
        </div>
        <Layout {... this.props} showCommandButton= {this.showCommandButton.bind(this)}/>
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
    apicShowCommands: (showCommand, deviceId, validationStatus) => {
      dispatch(apicShowCommands(showCommand, deviceId, validationStatus));
    },
    apicShowCommandsResponse: (commandResponse) => {
      dispatch(apicShowCommandsResponse(commandResponse));
    },
  };
};
export default connect(mapSateToProps, mapDispatchToProps) (ApicDevices);
