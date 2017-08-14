import React, {Component} from 'react';
import Modal from 'react-modal';
import { Session } from 'meteor/session';
import {Row,Col,Clearfix} from 'react-bootstrap';
export default class Table extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      modalLink: {newData:{graph:false}}
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }



  openModal(link) {
    this.setState({modalIsOpen: true});
    this.setState({modalLink: link});
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

  returnLayout(callback) {
    let findField = this.props.apic.apicDevicesFind.deviceName;
    let sortField = this.props.apic.sortBy.field;
    let sortOrderField = this.props.apic.sortBy.order;
    let dbData = this.props.dbReturn(findField,sortField,sortOrderField);
    let reachCheck = (status)=>{
      let passStyle = {
        backgroundColor:"#5cb85c"
      }
      let failStyle = {
        backgroundColor:"#d9534f"
      }
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
    const divStyles = {
      paddingTop: '5%',
      paddingButtom: '5%'
    };
    const rowStylesMain = {
      fontWeight: "bold"
    };
    let colData = dbData.map((data)=>{
      let status = data.siteData.dataObj.reachabilityStatus;
      return (
        <div key={data["_id"]} style= {divStyles}>
          <Row className="show-grid" style={rowStylesMain}>
            <Col xs={6} md={3}>{data.siteData.dataObj.hostname}</Col>
            <Col xs={6} md={2}>{data.siteData.dataObj.role}</Col>
            <Col xs={6} md={3}>Updated @ {data.siteData.dataObj.lastUpdated}</Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} md={1}>{data.siteData.dataObj.managementIpAddress}</Col>
            <Col xs={6} md={1}>  {reachCheck(status)}  </Col>
            <Col xs={6} md={2}>Ver: {data.siteData.dataObj.softwareVersion}</Col>
            <Col xs={6} md={2}>Up Time: {data.siteData.dataObj.upTime}</Col>
            <Col xs={6} md={1}>Int#: {data.siteData.dataObj.interfaceCount}</Col>
            <Col xs={6} md={4}>{data.siteData.dataObj.series}</Col>
            <Col xs={6} md={1}>{data.siteData.dataObj.serialNumber}</Col>
          </Row>
        </div>
      )
    })
    callback(colData)
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
        background            : `url(${this.state.modalLink.newData.graph})`,
        backgroundSize        : 'contain',
        opacity               : '100'
      }
    };


    //tableDiv = this.props.dbReturnRdy ? this.returnList() : "";
    tableDiv = this.props.apic.apicDevicesFind.validationStatus ? this.returnLayout((response)=>{
      console.log(response)
      tableDiv =  response}
    ) : "";
    //console.log(this)
    return(
      <div>
        {tableDiv}
      </div>
    )
  }
}
