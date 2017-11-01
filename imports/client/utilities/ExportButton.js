import React, { PropTypes} from 'react';
import {  Button } from 'react-bootstrap';
// note: THis does not provide true secuirty, it simply obfuscates

const ExportButton = React.createClass({
  getInitialState() {
    return {
      isLoading: false,
    };
  },

  render() {
    let isLoading = this.state.isLoading;
    return (
      <Button
        bsStyle={!isLoading ? "primary" : "danger"}
        bsSize="xsmall"
        disabled={isLoading}
        onClick={!isLoading ? this.handleClick : null}
      >
        {isLoading ? 'Loading...' : 'downInterfaces.csv'}
      </Button>
    );
  },

  handleClick() {
    this.setState({ isLoading: true });
    //      let dbData = this.props.dbSearch({"siteData.dataObj.vlanDetail.ipAddress":"10.64.116.253"});
    // This probably where you would have an `ajax` call
    setTimeout(() => {
      //db.itemapicdevices.find({"siteData.dataObj.interfaceDetail.status":"down","siteData.dataObj.interfaceDetail.className":"SwitchPort"},{"siteData.dataObj.interfaceDetail.portName":1,"siteData.dataObj.hostname":1,"siteData.dataObj.interfaceDetail.description":1,"siteData.dataObj.interfaceDetail.className":1,"_id":0}).sort({"siteData.dataObj.hostname":-1}).pretty()
      //{"siteData.dataObj.normalizeHostName":{$regex: findValue}}
      let test123 = this.props.dbSearch({"siteData.dataObj.vlanDetail.ipAddress":"10.64.116.253"},{fields:{'siteData.dataObj.interfaceDetail.portName':1}})
      console.log("dbData ",test123)
      console.log(this)
      //FileDownload("downInterfaces.csv","RandomeDatadadsfasdf asdnd Stuff")
      // Completed of async action, set loading state back
      this.setState({ isLoading: false });
    }, 2000);
  },
});


// checks type, throws and error. children should be simple object in a div
/*
IsRole.propTypes = {
  role: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired
};
*/
export default ExportButton;
