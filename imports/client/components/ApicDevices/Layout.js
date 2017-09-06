import React, {Component} from 'react';
import Modal from 'react-modal';
import { Session } from 'meteor/session';
import {Row,Col,Clearfix,Popover,ButtonToolbar,OverlayTrigger,Button} from 'react-bootstrap';
export default class Table extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      modalData: null,
      modalReturnData: null
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }



  openModal(vlanData) {
    if (vlanData === null){
      this.setState({modalData: null});
    } else {
      this.setState({modalIsOpen: true});
      this.setState({modalData: vlanData});
      // debug
      //console.log(this.state.modalLink);
    }
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  fiaTrace(){
    const textIdent = {
      textIndent: "25px"
    }
    return (
      <Popover id="popoverBottom" title="fiaTrace">
            no ip access-list extended acl-fia <br/>
            ip access-list extended acl-fia <br/>
            <p style={textIdent} >
              permit ip
              <b contentEditable="true" suppressContentEditableWarning={true}>clickToEdit</b>
              <b contentEditable="true" suppressContentEditableWarning={true}>clickToEdit</b><br/>
            </p>
          <p>
            debug platform condition ipv4 access-list acl-fia both <br/>
            debug platform condition start <br/>
            debug platform packet-trace packet 1024 fiaTrace <br/>
            debug platform packet-trace enable <br/>
          </p>
          <p>
            no ip access-list extended acl-fia <br/>
            no debug platform condition ipv4 access-list acl-fia both <br/>
            no debug platform condition start <br/>
            no debug platform packet-trace packet 1024 fiaTrace <br/>
            no debug platform packet-trace enable <br/>
            undebug all <br/>
          </p>
      </Popover>
    )
  }

  vlanData(vlanObj){
    let renderMe = (renderData1,renderData2)=>{
      return (
        <div key={Math.random()}>
          <table className = "table table-striped table-hover table-responsive">
            <thead className="thead-default">
              <tr>
                {renderData1}
              </tr>
            </thead>
            <tbody>
              <tr>
              {renderData2}
            </tr>
            </tbody>
          </table>
        </div>
      )
    }
    if (vlanObj === null){
      return (
        <div> No Data</div>
      )
    } else {
      return vlanObj.map((data,dataKey)=>{
        let thArray = [];
        let tdArray = [];
        thArray[dataKey] =[]
        tdArray[dataKey] =[]
        for (var [key, value] of Object.entries(data)) {
          thArray[dataKey].push(<th key={Math.random()}>{key}</th>)
          tdArray[dataKey].push(<td key={Math.random()}>{value}</td>)
        }
        return renderMe(thArray[dataKey],tdArray[dataKey])
      })
      }
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
    let fiaDetail = (deviceType) =>{
      if (deviceType == "BORDER ROUTER") {
        return true
      } else {
        return false
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
        let role = data.siteData.dataObj.role;
        let vlanInfo = (vlanArray) =>{

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
              {vlanDetail ? <Col xs={6} sm={6} md={4} onClick={()=>{this.openModal(vlanDetail)}} style={{cursor:"pointer"}}><b>VlanData</b></Col> : ""}
              {fiaDetail(role) ?
                <ButtonToolbar>
                  <OverlayTrigger trigger="click" placement="bottom" overlay={this.fiaTrace()}>
                    <Button>fiaTrace</Button>
                  </OverlayTrigger>
                </ButtonToolbar> : ""}
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
      },
      overlay:{zIndex:'5'}
    };

    //tableDiv = this.props.dbReturnRdy ? this.returnList() : "";
    //tableDiv = this.props.apic.apicDevicesFind.validationStatus ? this.returnLayout() : "";
    //console.log(this)
    return(
      <div>
        {this.returnLayout()}
        <div className="modal modal-content modal-responsive">
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="APIC Modal"
          >
            <div>
              {this.state.modalIsOpen ? this.vlanData(this.state.modalData) : ""}
            </div>
          </Modal>
        </div>
      </div>
    )
  }
}
