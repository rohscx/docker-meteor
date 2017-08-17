import React, {Component} from 'react';
import { Session } from 'meteor/session';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, FormControl, DropdownButton, MenuItem } from 'react-bootstrap';
import { primeDevicesFind, primeDbReady } from '../actions/primeActions'
import Layout from './PrimeHostPortInfo/Layout';
import { dnsSuffix } from '../actions/utilActions';

class PrimeHostPortInfo extends Component {
  constructor() {
    super();
    this.state = {
    }
  }
  handleSearchFormInput(event) {
    let value = event.target.value;
    let deviceFilter = "ALL"
    this.props.primeDevicesFind(value,deviceFilter,"cats");
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

    let buttonLabel = (textValue)=>{
      switch(textValue){
        case ".fpi.fpir.pvt":
        return "FPI";
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
                 title={"Domain: "+buttonLabel(this.props.util.dnsSuffix)}
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
        <Layout {... this.props}/>
      </div>
    )
  }
}

const mapSateToProps = (state) => {
  return {
    util: state.utilReducer,
    prime: state.primeReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dnsSuffix: (suffix) => {
      dispatch(dnsSuffix(suffix));
    },
    apicDevicesFind: (deviceName,deviceFilter,cdase) => {
      dispatch(apicDevicesFind(deviceName,deviceFilter,cdase));
    },
    sortBy: (sortValue, sortOrder) => {
      dispatch(sortBy(sortValue, sortOrder));
    },
    apicDbReady: (status) => {
      dispatch(apicDbReady(status));
    },
  };
};
export default connect(mapSateToProps, mapDispatchToProps) (PrimeHostPortInfo);
