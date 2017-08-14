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

  returnLayout() {
    let findField = this.props.apic.apicDevicesFind.deviceName;
    let sortField = this.props.apic.sortBy.field;
    let sortOrderField = this.props.apic.sortBy.order;
    let dbData = this.props.dbReturn(findField,sortField,sortOrderField);
    let statusCheck = (status) =>{
      let statusStyle = {
        mark: {
          backgroundColor: 'green'
        }
      }
      if (status == 'Reachable'){
        return (
          <mark>{text}</mark>
        )
      } else {
        return "dafsafa"
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
      return (
        <div key={data["_id"]} style= {divStyles}>
          <Row className="show-grid" style={rowStylesMain}>
            <Col xs={6} md={3}>{data.siteData.dataObj.hostname}</Col>
            <Col xs={6} md={4}>{data.siteData.dataObj.type}</Col>
          </Row>
          <Row className="show-grid"> statusCheck
            <Col xs={6} md={1}>{data.siteData.dataObj.managementIpAddress}</Col>
            <Col xs={6} md={1}>{statusCheck(data.siteData.dataObj.reachabilityStatus)}</Col>
            <Col xs={6} md={2}>Ver: {data.siteData.dataObj.softwareVersion}</Col>
            <Col xs={6} md={2}>Up Time: {data.siteData.dataObj.upTime}</Col>
            <Col xs={6} md={1}>Int#: {data.siteData.dataObj.interfaceCount}</Col>
            <Col xs={6} md={3}>{data.siteData.dataObj.series}</Col>
            <Col xs={6} md={2}>{data.siteData.dataObj.serialNumber}</Col>
          </Row>
        </div>
      )
    })
    return colData;
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
    tableDiv = this.props.apic.apicDevicesFind.validationStatus ? this.returnLayout() : "";
    console.log(this)
    return(
      <div>
        {tableDiv}
      </div>
    )
  }
}
