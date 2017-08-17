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
    let findField = this.props.prime.primeDevicesFind.deviceName;
    let sortField = this.props.prime.sortBy.field;
    let sortOrderField = this.props.prime.sortBy.order;
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
        let status = data.hostData.dataObj.reachabilityStatus;
        let mgmtIpAddress = data.hostData.dataObj.managementIpAddress;
        return (
          <div key={data["_id"]} style= {divStyles}>
            <Row className="show-grid" style={rowStylesMain}>
              <Col xs={8} sm={6} md={3}>{data.hostData.dataObj.clientsDTO.deviceName}</Col>
              <Col xs={6} sm={6} md={2}>{data.hostData.dataObj.clientsDTO.clientInterface}</Col>
              <Col xs={6} sm={6} md={3}>AssociationTime {data.hostData.dataObj.clientsDTO.associationTime}</Col>
              <Col xs={6} sm={6} md={2}>NacStatus: {data.hostData.dataObj.clientsDTO.securityPolicyStatus}</Col>
            </Row>
            <Row className="show-grid">
              <Col xs={6} sm={6} md={3}>UserName:{data.hostData.dataObj.clientsDTO.userName}</Col>
              <Col xs={6} sm={6} md={2}>{data.hostData.dataObj.clientsDTO.ipAddress}</Col>
              <Col xs={5} sm={6} md={2}>{data.hostData.dataObj.clientsDTO.macAddress}</Col>
              <Col xs={6} sm={6} md={2}>VlanName:{data.hostData.dataObj.clientsDTO.vlan}</Col>
              <Col xs={6} sm={6} md={1}>VlanId:{data.hostData.dataObj.clientsDTO.vlanId}</Col>
              <Col xs={6} sm={6} md={3}>Vendor:{data.hostData.dataObj.clientsDTO.vendor}</Col>
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
        background            : `url(${this.state.modalLink.newData.graph})`,
        backgroundSize        : 'contain',
        opacity               : '100'
      }
    };


    //tableDiv = this.props.dbReturnRdy ? this.returnList() : "";
    //tableDiv = this.props.apic.apicDevicesFind.validationStatus ? this.returnLayout() : "";
    console.log(this)
    return(
      <div>
        {this.returnLayout()}
      </div>
    )
  }
}
