import React, {Component} from 'react';
import Modal from 'react-modal';
import { Session } from 'meteor/session';
import {Row,Col,Clearfix} from 'react-bootstrap';
export default class Table extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      modalData: ""
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }



  openModal(vlanData) {
    this.setState({modalIsOpen: true});
    this.setState({modalData: vlanData});
    // debug
    //console.log(this.state.modalLink);
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  returnLayout() {
    let findField = this.props.apic.apicDevicesFind.deviceName;
    let sortField = this.props.apic.sortBy.field;
    let sortOrderField = this.props.apic.sortBy.order;
    let passStyle = {
      backgroundColor:"#5cb85c"
    }
    let failStyle = {
      backgroundColor:"#d9534f"
    }
    const divStyles = {
      paddingTop: '5%',
      paddingButtom: '5%'
    }
    const rowStylesMain = {
      fontWeight: "bold"
    }
    let reachCheck = (status)=>{
      if(status == 'Reachable'){
        return (
          <mark style={passStyle}>{status}</mark>
        )
      } else {
        return (
          <mark style={failStyle}>{status}</mark>
        )
      }
    }
    let sshLinkGen = (ipAddress)=>{
      if(ipAddress.length >= 5){
        return "ssh://"+ipAddress;
      } else {
        return ipAddress;
      }
    }
    if (findField.length >= 3 || findField == "."){
      //console.log(findField.length)
      //console.log(findField)
      let dbData = this.props.dbReturn(findField,sortField,sortOrderField);
      let colData = dbData.map((data)=>{
        let status = data.siteData.dataObj.reachabilityStatus;
        let mgmtIpAddress = data.siteData.dataObj.managementIpAddress;
        let vlanDetail = data.siteData.dataObj.vlanDetail;
        return vlanInfo = (vlanArray) =>{
          vlanArray.map((data,key)=>{
            for (var [key, value] of Object.entries(data)) {
              let vlanInfo = key+"  "+value;
              console.log(vlanInfo)
              return vlanInfo;
            }
          })
        }
        return (
          <div key={data["_id"]} style= {divStyles}>
            <Row className="show-grid" style={rowStylesMain}>
              <Col xs={8} sm={6} md={3}>{data.siteData.dataObj.hostname}</Col>
              <Col xs={6} sm={6} md={2}>{data.siteData.dataObj.role}</Col>
              <Col xs={6} sm={6} md={6}>Updated @ UTC {data.siteData.dataObj.lastUpdated}</Col>
            </Row>
            <Row className="show-grid">
              <Col xs={5} sm={6} md={2}><a href={sshLinkGen(mgmtIpAddress)}>{mgmtIpAddress}</a></Col>
              <Col xs={6} sm={6} md={2}>{reachCheck(status)} </Col>
              <Col xs={6} sm={6} md={2}>Ver: {data.siteData.dataObj.softwareVersion}</Col>
              <Col xs={6} sm={6} md={3}>Up Time: {data.siteData.dataObj.upTime}</Col>
              <Col xs={6} sm={6} md={1}>Int#: {data.siteData.dataObj.interfaceCount}</Col>
              <Col xs={6} sm={6} md={1}>{data.siteData.dataObj.serialNumber}</Col>
              <Col xs={6} sm={6} md={4}>{data.siteData.dataObj.series}</Col>
              {vlanDetail ? <Col xs={6} sm={6} md={4}>{vlanInfo(vlanDetail)}</Col> : ""}
            </Row>
          </div>
        )
      })
      //this.props.apicDbReady(true)
      return colData;
    } else {
      return "";
    }

  }



  render() {
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        height                : '300px',
        width                 : '920px',
        transform             : 'translate(-50%, -50%)',
        backgroundSize        : 'contain',
        opacity               : '100'
      }
    };


    //tableDiv = this.props.dbReturnRdy ? this.returnList() : "";
    //tableDiv = this.props.apic.apicDevicesFind.validationStatus ? this.returnLayout() : "";
    //console.log(this)
    return(
      <div>
        {this.returnLayout()}
      </div>
    )
  }
}
