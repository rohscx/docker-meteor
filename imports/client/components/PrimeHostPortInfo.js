import React, {Component} from 'react';
import { Session } from 'meteor/session';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, FormControl, DropdownButton, MenuItem } from 'react-bootstrap';
import { hostName, getDevices } from '../actions/prtgActions';
//import Layout from './ApicDevices/Layout';
import { dnsSuffix } from '../actions/utilActions';

class PrimeHostPortInfo extends Component {
  constructor() {
    super();
    this.state = {
    }
  }
  handleSearchFormInput(event) {
    let value = event.target.value;
    let suffix = this.props.util.dnsSuffix
    if (value.trim().length == 3){
      this.props.dnsLookup(value+suffix)
    }
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

  setDnsSuffix(suffix){
    this.props.dnsSuffix(suffix)
  }

  preventDefault(e){
    e.preventDefault();
  }

  getDevices(){
    this.props.getDevices();
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
      /*
      let dataReturn = this.props.apic.apicDevicesFind.deviceName;
      let dataReady = this.props.apic.apicDevicesFind.validationStatus;

      let dataValueCheck = dataReturn ? 10 : ""
      if(dataReady === null){
        return null;
      } else if (dataReady === false){
        return "error";
      } else {
        return "success";
      }*/
      return null
    };

    const divStyles = {
      margin: "auto",
      width: "40%"
    };
    let acaField = ()=>{
      console.log("hittt")
      let suffix = this.props.util.dnsSuffix;
      let acaName = ""
      switch(suffix){
        case ".fpi.fpir.pvt":
        acaname = "fpi";
        break;
      }
      console.log(acaName)
      return acaName;
    }
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
          <FormGroup validationState={validationStatus()}>
             <InputGroup>
               <FormControl placeholder="Enter Device Name..." type="text" onChange={formInput()}/>
               <DropdownButton
                 componentClass={InputGroup.Button}
                 id="input-dropdown-addon"
                 title={buttonLabel(acaField}
               >
                 <MenuItem key="1" onSelect= {()=>{this.setDnsSuffix(".fpi.fpir.pvt")}}>FPI</MenuItem>
                 <MenuItem key="2" onSelect= {()=>{this.setDnsSuffix("reachabilityStatus",-1)}}>AGC</MenuItem>
                 <MenuItem key="3" onSelect= {()=>{this.setDnsSuffix("upTime",1)}}>FCW</MenuItem>
                 <MenuItem key="4" onSelect= {()=>{this.setDnsSuffix("softwareVersion",1)}}>NWFCS</MenuItem>
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

      </div>
    )
  }
}

const mapSateToProps = (state) => {
  return {
    util: state.utilReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dnsSuffix: (suffix) => {
      dispatch(dnsSuffix(suffix));
    },
  };
};
export default connect(mapSateToProps, mapDispatchToProps) (PrimeHostPortInfo);
