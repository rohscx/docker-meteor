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

  handleCopyClick(event) {
    let value = event.target.value;
    console.log(event.currentTarget.textContent)
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

  routerPcap() {
    const clipboardButton = ()=>{
      return (
        <Row className="show-grid">
          <Col xs={6} xsOffset={6}>
            <div style={{textAlign:"right"}} onClick={(e) => {this.handleCopyClick(e)}}>
              copyPlaceHolder
            </div>
          </Col>
        </Row>
      )
    };
    return (
      <Popover id="popover-trigger-click-root-close" title="Router Packet Capture">
        <div>
          <div id="test1" onClick={(e) => {this.handleCopyClick(e)}}>
            {clipboardButton()}
            <Row className="show-grid">
              <Col xs={12}>
                <p>*         *         *<br/>
                ##Sets Capture parameters <br/>
                ip access-list extended HOSTCAP <br/>
                deny ip any host 224.0.0.2 <br/>
                permit ip any any <br/></p>
                <p>*         *         *<br/>
                ##Starts Capture## <br/>
                monitor capture CAP1 int
                 <b contentEditable="true" suppressContentEditableWarning={true}>
                   <mark>gi0/0/0.200</mark>
                 </b>
                 both access-list HOSTCAP <br/>
                monitor capture CAP1 start <br/></p>
              </Col>
            </Row>
          </div>
          <div>
            {clipboardButton()}
            <Row className="show-grid">
              <Col xs={12}>
                <p>*         *         *<br/>
                ##View Caputure## <br/>
                show monitor capture CAP1 buffer detailed | in TCP|# <br/>
                show monitor capture  CAP1 buffer <br/></p>
              </Col>
            </Row>
          </div>
          <div>
            {clipboardButton()}
            <Row className="show-grid">
              <Col xs={12}>
                <p>*         *         *<br/>
                ##Exports PCAP <br/>
                monitor capture CAP1 export tftp://
                <b contentEditable="true" suppressContentEditableWarning={true}><mark>11.16.15.16</mark></b>
                <b>/</b>
                <b contentEditable="true" suppressContentEditableWarning={true}><mark>mega-yards1000-r2</mark></b>
                .pcap </p><br/>
              </Col>
            </Row>
          </div>
          <div>
            {clipboardButton()}
            <Row className="show-grid">
              <Col xs={12}>
                <p>*         *         *<br/>
                ##Stops Capture## <br/>
                monitor capture CAP1 stop <br/></p>
              </Col>
            </Row>
          </div>
          <div>
            {clipboardButton()}
            <Row className="show-grid">
              <Col xs={12}>
                <p>*         *         *<br/>
                ##removes configuration## <br/>
                No ip access-list extended HOSTCAP <br/>
                No monitor capture CAP1 <br/></p>
              </Col>
            </Row>
          </div>
        </div>
      </Popover>
    )
  }

  switchPcap() {
    return (
      <Popover id="popover-trigger-click-root-close" title="Switch Packet Capture">
        <p>*         *         *<br/>
          ##Sets Capture parameters <br/>
          !GLOBAL CONFIGURATION MODE <br/>
          conf t <br/>
          ip access-list extended HOSTCAP <br/>
          permit ip
          <b contentEditable="true" suppressContentEditableWarning={true}> <mark>10.0.0.0</mark> </b>
          <b contentEditable="true" suppressContentEditableWarning={true}> <mark>10.30.0.0</mark> </b></p><br/>
        <p>*         *         *<br/>
          ## Attaches filter## <br/>
          !PRIVLEGED EXEC <br/>
          end <br/>
          monitor capture buffer CAP1 <br/>
          monitor capture buffer CAP1 filter access-list HOSTCAP </p><br/>

        <p>*         *         *<br/>
          ##Creates named capture point## <br/>
          monitor capture point ip cef cef1 all both <br/>
          monitor capture point ip process-switched process-switched1 both <br/>
          monitor capture point ip process-switched process-switched2 from-us </p><br/>

        <p>*         *         *<br/>
          ## Associates interface to capture point name## <br/>
          monitor capture point associate cef1 CAP1 <br/>
          monitor capture point associate process-switched1 CAP1 <br/>
          monitor capture point associate process-switched2 CAP1 </p><br/>


        <p>*         *         *<br/>
          ##Starts Capture## <br/>
          monitor capture point start cef1 <br/>
          monitor capture point start process-switched1 <br/>
          monitor capture point start process-switched2 </p><br/>

        <p>*         *         *<br/>
          ##Shows capture## <br/>
          show monitor capture buffer all parameters <br/>
          show monitor capture buffer CAP1 dump | i Vl </p><br/>

        <p>*         *         *<br/>
          ##Stops Capture## <br/>
          monitor capture point stop cef1 <br/>
          monitor capture point stop process-switched1 <br/>
          monitor capture point stop process-switched2 <br/>
          no monitor capture buffer CAP1 <br/>
          no monitor capture point ip cef cef1 all both <br/>
          no monitor capture point ip process-switched process-switched1 all both
          no monitor capture point ip process-switched process-switched2 from-us </p><br/>

        <p>
          *         *         *<br/>
          ##Exports PCAP## <br/>
          monitor capture buffer CAP1 export tftp://
          <b contentEditable="true" suppressContentEditableWarning={true}><mark>11.16.15.16</mark></b>
          <b>/</b>
          <b contentEditable="true" suppressContentEditableWarning={true}><mark>mega-yards2-s1</mark></b>
          .pcap </p><br/>
      </Popover>
    )
  }

  fiaTrace(){
    const textIdent = {
      textIndent: "25px"
    }
    return (
      <Popover id="popover-trigger-click-root-close" title="fiaTrace">
            *         *         *<br/>
            ##Identifies traffic and starts fiaTrace## <br/>
            !GLOBAL CONFIGURATION MODE
            conf t <br/>
            no ip access-list extended acl-fia <br/>
            ip access-list extended acl-fia <br/>
            <p style={textIdent} >
              permit ip
              <b contentEditable="true" suppressContentEditableWarning={true}> <mark>10.0.0.0</mark> </b>
              <b contentEditable="true" suppressContentEditableWarning={true}> <mark>10.30.0.0</mark> </b><br/>
            </p>
          <p>
            !PRIVLEGED EXEC <br/>
            end <br/>
            debug platform condition ipv4 access-list acl-fia both <br/>
            debug platform condition start <br/>
            debug platform packet-trace packet 1024 fia-trace <br/>
            debug platform packet-trace enable <br/>
          </p>
          <p>
            *         *         *<br/>
            ##Display fiaTrace results## <br/>
            !PRIVLEGED EXEC <br/>
            end <br/>
            show platform all <br/>
            show platform packet-trace summary <br/>
            show platform packet-trace packet1 <br/>
          </p>
          <p>
            *         *         *<br/>
            ##Remove fiaTrace configuration## <br/>
            !GLOBAL CONFIGURATION MODE <br/>
            conf t <br/>
            no ip access-list extended acl-fia <br/>
            !PRIVLEGED EXEC <br/>
            end <br/>
            no debug platform condition ipv4 access-list acl-fia both <br/>
            debug platform condition stop <br/>
            no debug platform packet-trace packet 1024 fia-trace <br/>
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
    const fiaDetail = (deviceType) =>{
      if (deviceType == "BORDER ROUTER") {
        return true
      } else {
        return false
      }
    }
    const switchPcapDetail = (deviceType) =>{
      if (deviceType == "Cisco Catalyst 2960 Series Switches") {
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
        let series = data.siteData.dataObj.series;
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
              <ButtonToolbar>
                {fiaDetail(role) ? <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={this.fiaTrace()}>
                  <Button bsSize="xsmall">fiaTrace</Button>
                </OverlayTrigger> : ""}
                {fiaDetail(role) ? <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={this.routerPcap()}>
                  <Button bsSize="xsmall">rPCAP</Button>
                </OverlayTrigger> : ""}
                {switchPcapDetail(series) ? <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={this.switchPcap()}>
                  <Button bsSize="xsmall">sPCAP</Button>
                </OverlayTrigger> : ""}
              </ButtonToolbar>
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
