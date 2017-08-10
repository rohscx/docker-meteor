import React, {Component} from 'react';
import { Session } from 'meteor/session';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, FormControl, DropdownButton, MenuItem } from 'react-bootstrap';
import { hostName, getDevices } from '../actions/prtgActions';
import Table from './TransferRate/Table';
import { bandwidthCalc } from '../actions/utilActions'

class TransferRate extends Component {
  constructor() {
    super();
    this.state = {
    }
  }
  handleSearchFormInput(event) {
    let value = event.target.value;
    let byteType = this.props.util.bandwidthCalcData.byteType;
    console.log(value," ",byteType)
    this.props.bandwidthCalc(value, byteType,null);
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
    console.log("Changed",byteType )
    this.props.bandwidthCalc(null, byteType,value);
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
      let dataReturn = this.props.util.bandwidthCalcData.number;
      let dataReady = this.props.util.bandwidthCalcData.validationStatus;
      let dataValueCheck = dataReturn ? 0 : 0
      if(dataValueCheck.length <= 0){
        return null;
      } else if (isNaN(dataReturn) == true){
        return "error";
      } else {
        return "success";
      }
    };

    const divStyles = {
      margin: "auto",
      width: "40%"
    };
    let byteType = this.props.util.bandwidthCalcData.byteType;
    return (
      <div style={divStyles}>
        <form onSubmit= {e =>{this.preventDefault(e)}}>
          <FormGroup validationState={validationStatus()}>
             <InputGroup>
               <FormControl type="text" onChange={formInput()}/>
               <DropdownButton
                 componentClass={InputGroup.Button}
                 id="input-dropdown-addon"
                 title={byteType}
               >
                 <MenuItem key="1" onSelect= {()=>{this.setByteType("MB")}}>MB</MenuItem>
                 <MenuItem key="2" onSelect= {()=>{this.setByteType("GB")}}>GB</MenuItem>
                 <MenuItem key="3" onSelect= {()=>{this.setByteType("TB")}}>TB</MenuItem>
                 <MenuItem key="4" onSelect= {()=>{this.setByteType("PB")}}>PB</MenuItem>
                 <MenuItem key="5" onSelect= {()=>{this.setByteType("ZB")}}>ZB</MenuItem>
               </DropdownButton>
             </InputGroup>
           </FormGroup>
        </form>
      </div>
    );
  }



  render() {
    const divStyles = {
      paddingTop: "1%",
      paddingBottom:"5%"
    };
    console.log(this);

    return(
      <div style={divStyles}>
        {this.form()}
        <Table {... this.props}/>
      </div>
    )
  }
}

const mapSateToProps = (state) => {
  return {
    util: state.utilReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    bandwidthCalc: (number,byteType,numberCurrent) => {
      dispatch(bandwidthCalc(number,byteType,numberCurrent));
    },
  };
};
export default connect(mapSateToProps, mapDispatchToProps) (TransferRate);
