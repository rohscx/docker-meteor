import React, {Component} from 'react';
import { Session } from 'meteor/session';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, FormControl, DropdownButton, MenuItem } from 'react-bootstrap';
import { primeDevicesFind, primeDbReady, sortBy } from '../actions/primeActions'
import Layout from './PrimeHostPortInfo/Layout';

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

  setSortBy(sortName, sortOrder){
    this.props.sortBy(sortName, sortOrder)
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
        case "associationTime":
        return "Time";
      break;
        case "ipAddress":
        return "IP";
      break;
        case "macAddress":
        return "MAC";
      break;
      case "deviceName":
      return "DEVICE";
    break;
      }
    };
    return (
      <div style={divStyles}>
        <form onSubmit= {e =>{this.preventDefault(e)}}>
          <FormGroup validationState={validationStatus()}>
             <InputGroup>
               <FormControl placeholder="..." type="text" onChange={formInput()}/>
               <DropdownButton
                 componentClass={InputGroup.Button}
                 id="input-dropdown-addon"
                 title={"SortBy: "+buttonLabel(this.props.prime.sortBy.field)}
               >
                 <MenuItem key="1" onSelect= {()=>{this.setSortBy("associationTime", -1)}}>Time</MenuItem>
                 <MenuItem key="2" onSelect= {()=>{this.setSortBy("ipAddress",-1)}}>IP</MenuItem>
                 <MenuItem key="3" onSelect= {()=>{this.setSortBy("macAddress",-1)}}>MAC</MenuItem>
                 <MenuItem key="4" onSelect= {()=>{this.setSortBy("deviceName",1)}}>DEVICE</MenuItem>
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

const mapStateToProps = (state) => {
  return {
    prime: state.primeReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    primeDevicesFind: (deviceName,deviceFilter,cdase) => {
      dispatch(primeDevicesFind(deviceName,deviceFilter,cdase));
    },
    sortBy: (sortValue, sortOrder) => {
      dispatch(sortBy(sortValue, sortOrder));
    },
    primeDbReady: (status) => {
      dispatch(primeDbReady(status));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps) (PrimeHostPortInfo);
