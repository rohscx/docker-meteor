import React, {Component} from 'react';
import { Session } from 'meteor/session';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, FormControl, DropdownButton, MenuItem, ButtonToolbar, Button, ButtonGroup,SplitButton } from 'react-bootstrap';
import { hostName, getDevices } from '../actions/prtgActions';
import Layout from './ApicDevices/Layout';
import DeviceTypeCountBar from './CountBar/DeviceTypeCountBar';
import { sortBy, apicDevicesFind, apicDbReady, apicShowCommands, searchFilterList} from '../actions/apicActions';
import { fiaTrace } from '../actions/utilActions';
import FileDownload from '../utilities/FileDownload';
import ExportButton from '../utilities/ExportButton';
import CreateCSV from '../utilities/CreateCSV';
import ApicModal from './ApicDevices/ApicModal';

class ApicDevices extends Component {
  constructor() {
    super();
    this.state = {
      showCommandLoading:{
        state:false,
        id:null
      }
    }
  }

  handleShowCommandLoading(id1) {
    this.setState({ showCommandLoading:{
      state:true,
      id:id1
      }
    });
    Meteor.setTimeout(() => {
      // Completed of async action, set loading state back
      this.setState({ showCommandLoading:{
        state:false,
        id:id1
      }
      });
    }, 10000);
  }

  handleSearchFormInput(event) {
    let value = event.target.value;
    let deviceFilter = "ALL"
    this.props.apicDevicesFind(value,deviceFilter,"cats");
    // resets auto loading div to default display amount
    this.props.setDbFindLimit(15)
  }

  handleSearchFilterList(event) {
    let value = event.target.value;
    this.props.searchFilterList(value);
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
    const deviceI = this.props.apic.apicShowCommands.deviceId;
    // debug
    console.log("setApicShowCommands ", deviceId);
    this.props.apicShowCommands(showCommand, deviceId, validationStatus);
  }

  preventDefault(e){
    e.preventDefault();
  }

  getDevices(){
    this.props.getDevices();
  }



  downloadData(){
    //FileDownload("downInterfaces.csv","RandomeDatadadsfasdf asdnd Stuff")
    //this.props.dbSearch({"siteData.dataObj.vlanDetail.ipAddress":"10.204.61.1"},{fields:{"siteData._id":1}})  a
    const csvInterfacesQuery = {
      dbOptions:[{"siteData.dataObj.interfaceDetail":{"$exists":true}},{sort:{"siteData.dataObj.hostname":-1}}],
      db:this.props.dbSearch.bind(this)
    }
    const csvAccessPointsQuery = {
      dbOptions:[{"siteData.dataObj.family":"Unified AP"},{sort:{"siteData.dataObj.hostname":-1}}],
      db:this.props.dbSearch.bind(this)
    }
    const csvVlansQuery = {
      dbOptions:[{"siteData.dataObj.vlanDetail":{"$exists":true}},{sort:{"siteData.dataObj.hostname":-1}}],
      db:this.props.dbSearch.bind(this)
    }


    function dbDataGenerator (a,b) {
      let dbQuery = a;
      let switchExpression = b;
      function dbData () {

        let dbData = dbQuery.db(dbQuery.dbOptions[0],dbQuery.dbOptions[1]);
        return CreateCSV(dbData,switchExpression);
      }
      function setExpression (a) {
        switchExpression =  a;
      }
      function setDbQuery (a) {
        dbQuery =  a;
      }
      let generator = {
        getData:dbData,
        setData:setExpression,
        setDbQuery:setDbQuery
      }
      return generator;
    }

    return (
      <div>
        <ButtonToolbar>
          <ExportButton {...this.props} fileName = "downInterfaces(raw).csv" fileData = {new dbDataGenerator(csvInterfacesQuery,"downInterfaces(raw).csv")}/>
          <ExportButton {...this.props} fileName = "downInterfaces(protracted).csv" fileData = {new dbDataGenerator(csvInterfacesQuery,"downInterfaces(protracted).csv")}/>
          <ExportButton {...this.props} fileName = "downInterfaces(switches).csv" fileData = {new dbDataGenerator(csvInterfacesQuery,"downInterfaces(switches).csv")}/>
          <ExportButton {...this.props} fileName = "halfDuplexInterfaces(switches).csv" fileData = {new dbDataGenerator(csvInterfacesQuery,"halfDuplexInterfaces(switches).csv")}/>
          <ExportButton {...this.props} fileName = "accessPoints(raw).csv" fileData = {new dbDataGenerator(csvAccessPointsQuery,"accessPoints(raw).csv")}/>
          <ExportButton {...this.props} fileName = "vlans(routers).csv" fileData = {new dbDataGenerator(csvVlansQuery,"vlans(routers).csv")}/>
        </ButtonToolbar>
      </div>
    )
  }

  downloadData1(dataObj){
    //FileDownload("downInterfaces.csv","RandomeDatadadsfasdf asdnd Stuff")
    //this.props.dbSearch({"siteData.dataObj.vlanDetail.ipAddress":"10.204.61.1"},{fields:{"siteData._id":1}})  a

    function dbDataGenerator (a,b) {
      let dbQuery = a;
      let switchExpression = b;
      function dbData () {
        let dbData = a;
        return CreateCSV(dbData,switchExpression);
      }
      function setExpression (a) {
        switchExpression =  a;
      }
      function setDbQuery (a) {
        dbQuery =  a;
      }
      let generator = {
        getData:dbData,
        setData:setExpression,
        setDbQuery:setDbQuery
      }
      return generator;
    }
    return (
      <div>
        <ButtonToolbar>
          <ExportButton {...this.props} fileName = "generic.csv" fileData = {dbDataGenerator(dataObj,"generic.csv")}/>
        </ButtonToolbar>
      </div>
    )
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



  form1(){
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
    const formInput = () => {
      return (
        this.handleSearchFilterList.bind(this)
      );
    };

    const divStyles = {
      margin: "auto",
      width: "40%",
      float: "left"
    };

    return (
      <div style={divStyles}>
        <form onSubmit= {e =>{this.preventDefault(e)}}>
          <FormGroup>
             <InputGroup>
               <FormControl placeholder={this.props.apic.searchFilterList.searchString.length > 0 ? this.props.apic.searchFilterList.searchString.substring(0,5)+" . . ." : "Search . . ."} type="text" onChange={formInput()}/>
             </InputGroup>
           </FormGroup>
        </form>
      </div>
    );
  }


  showCommandButton(deviceID,dbId) {
    const showC = this.props.apic.apicShowCommands.showCommand;
    const deviceI = this.props.apic.apicShowCommands.deviceId;
    const validS = this.props.apic.apicShowCommands.validationStatus;
    let isLoading = new Object;
    isLoading.showCommandState = this.state.showCommandLoading.state;
    isLoading.showCommandId = this.state.showCommandLoading.id;

    const isSelf = (state, id1, id2)=>{
      if (state == true && (id1 == id2)) {
        return true;
      } else {
        return false;
      }
    }
    const commandRunner = (scmd,uuid,dbid) =>{
      if (deviceID == deviceI){
        this.handleShowCommandLoading(uuid);
      }
      //default action if someone just submits the request
      console.log(scmd)
      console.log(uuid)
      const commandData = Meteor.call('apicShowCommands',scmd,uuid,dbid, function(error, result){
        if (error){
          console.log(error)
        } else {
          console.log(result)
          // sets timeout to clear apicShowCommand after 5 minutes
          const newDbID = result;
          Meteor.call('apicClearShowCommands',newDbID, function(error, result){
            if (error){
              console.log(error)
            } else {
              console.log("db Clear after 5 minutes on dbID!!! ",newDbID)
            }
          });
          //does not really return anything
          return result;
        }
      });
    }
    return (

      <SplitButton
        bsSize="xsmall"
        title= {isSelf(isLoading.showCommandState, isLoading.showCommandId, deviceID) ? '   .  .  .   ' : 'runShow'}
        id="split-button-dropdown"
        onClick={()=>{commandRunner(showC,deviceI,dbId)}}
        disabled={isSelf(isLoading.showCommandState, isLoading.showCommandId, deviceID)}
        onMouseEnter={()=>{this.setApicShowCommands(showC,deviceID,99)}}
        >
          <MenuItem eventKey="1" onSelect={()=>{this.setApicShowCommands("show Clock",deviceID,1)}}>showClock</MenuItem>
          <MenuItem eventKey="2" onSelect={()=>{this.setApicShowCommands("show standby brief",deviceID,2)}}>showHSRP</MenuItem>
          <MenuItem eventKey="3" onSelect={()=>{this.setApicShowCommands("show run | s bgp",deviceID,3)}}>showBgp</MenuItem>
          <MenuItem eventKey="4" onSelect={()=>{this.setApicShowCommands("show run | s sla",deviceID,4)}}>showIpSla</MenuItem>
          <MenuItem eventKey="5" onSelect={()=>{this.setApicShowCommands("show ip eigrp neighbors",deviceID,5)}}>showEigpNeighbor</MenuItem>
          <MenuItem eventKey="6" onSelect={()=>{this.setApicShowCommands("show ip ospf neighbor",deviceID,6)}}>showOspfNeighbor</MenuItem>
          <MenuItem eventKey="7" onSelect={()=>{this.setApicShowCommands("show ip bgp summary",deviceID,7)}}>showBgpfNeighbor</MenuItem>
          <MenuItem eventKey="8" onSelect={()=>{this.setApicShowCommands("show ip nbar protocol-pack active",deviceID,8)}}>showActiveNbar</MenuItem>
          <MenuItem eventKey="9" onSelect={()=>{this.setApicShowCommands("show cdp neighbors",deviceID,9)}}>showCdpNeighbors</MenuItem>
          <MenuItem eventKey="10" onSelect={()=>{this.setApicShowCommands("show inventory",deviceID,10)}}>showInventory</MenuItem>
      </SplitButton>

    )
  }


  render() {
    const divStyles = {
      paddingBottom:"5%"
    };
    //console.log(this);
    return(
      <div style={divStyles}>
        <div id="example"><ApicModal></ApicModal></div>

        {this.form()}
        <DeviceTypeCountBar {... this.props}/>
        <div style={{float:"right"}}>
          {this.downloadData.bind(this)}
        </div>
        <Layout {... this.props} showCommandButton={this.showCommandButton.bind(this)} search={this.form1.bind(this)} download={this.downloadData1.bind(this)}/>
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

// Redux. Be sure to import the dispatch!
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
    searchFilterList: (interfaceName) => {
      dispatch(searchFilterList(interfaceName));
    },
  };
};
export default connect(mapSateToProps, mapDispatchToProps) (ApicDevices);
