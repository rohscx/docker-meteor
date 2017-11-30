import React, {Component} from 'react';
import createReactClass from 'create-react-class';
import Modal from 'react-modal';
import { Session } from 'meteor/session';
import {Row,Col,Clearfix,Popover,ButtonToolbar,OverlayTrigger,Button,Tooltip,ButtonGroup} from 'react-bootstrap';
import IsRole from '../../utilities/IsRole';
import ScrollHandler from '../../utilities/ScrollHandler';
import ApicModal from './ApicModal';

export default class Layout extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      modalData: null,
      modalReturnData: null,
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  handleCopyClick = (clipName) => {

    const worker = (text) => {
      var textArea = document.createElement("textarea");

      textArea.style.position = 'fixed';
      textArea.style.top = 0;
      textArea.style.left = 0;

      // Ensure it has a small width and height. Setting to 1px / 1em
      // doesn't work as this gives a negative w/h on some browsers.
      textArea.style.width = '2em';
      textArea.style.height = '2em';

      // We don't need padding, reducing the size if it does flash render.
      textArea.style.padding = 0;

      // Clean up any borders.
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';

      // Avoid flash of white box if rendered for any reason.
      textArea.style.background = 'transparent';


      textArea.value = text;

      document.body.appendChild(textArea);

      textArea.select();

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
      } catch (err) {
        console.log('Oops, unable to copy');
      }

      document.body.removeChild(textArea);
    }


    //this.setCap.innerText.focusTextInput()
    //document.getElementById("ttt").focus();
    //this.setCap.innerHTML.focus()
    // used with refs
    console.log(this[clipName].innerText)
    //console.log(this.setCap.childNodes[1].children["0"].id)
    worker(this[clipName].innerText)
    //await worker(this[clipName].innerText)
    //await Clipboard.setString(this.setCap.innerText)
  }

  openModal(data) {
    if (data === null){
      this.setState({modalData: null});
    } else {
      this.setState({modalIsOpen: true});
      this.setState({modalData: data});
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

  clipboardButton (clipName) {
    return (
      <Row className="show-grid">
        <Col xs={6} xsOffset={6}>
          <div  style={{float:"right"}}>
            <ButtonToolbar>
              <Button bsSize="xsmall" onClick={() => {this.handleCopyClick(clipName)}}>Copy</Button>
            </ButtonToolbar>
          </div>
        </Col>
      </Row>
    )
  }

  routerPcap() {
    return (
      <Popover id="popover-trigger-click-root-close" title="Router Packet Capture">
        <div>
          <div>
            {this.clipboardButton("rPCAPone")}
            <Row className="show-grid">
              <Col xs={12}>
                <div ref={(rPCAPone)=>{this.rPCAPone = rPCAPone}}>
                  <p>#         #         #<br/>
                  ##Sets Capture parameters <br/>
                  ip access-list extended HOSTCAP <br/>
                  deny ip any host 224.0.0.2 <br/>
                  permit ip any any <br/></p>
                  <p>#         #         #<br/>
                  ##Starts Capture## <br/>
                  monitor capture CAP1 int
                   <b contentEditable="true" suppressContentEditableWarning={true}>
                     <mark>gi0/0/0.200</mark>
                   </b>
                   both access-list HOSTCAP <br/>
                  monitor capture CAP1 start </p><br/><br/>
                </div>
              </Col>
            </Row>
          </div>
          <div>
            {this.clipboardButton("rPCAPtwo")}
            <Row className="show-grid">
              <Col xs={12}>
                <div ref={(rPCAPtwo)=>{this.rPCAPtwo = rPCAPtwo}}>
                  <p>#         #         #<br/>
                  ##View Caputure## <br/>
                  show monitor capture CAP1 buffer detailed | in TCP|# <br/>
                  show monitor capture  CAP1 buffer </p><br/><br/>
                </div>
              </Col>
            </Row>
          </div>
          <div>
            {this.clipboardButton("rPCAPthree")}
            <Row className="show-grid">
              <Col xs={12}>
                <div ref={(rPCAPthree)=>{this.rPCAPthree = rPCAPthree}}>
                  <p>#         #         #<br/>
                  ##Exports PCAP <br/>
                  monitor capture CAP1 export tftp://
                  <b contentEditable="true" suppressContentEditableWarning={true}><mark>11.16.15.16</mark></b>
                  <b>/</b>
                  <b contentEditable="true" suppressContentEditableWarning={true}><mark>mega-yards1000-r2</mark></b>
                  .pcap </p><br/><br/>
                </div>
              </Col>
            </Row>
          </div>
          <div>
            {this.clipboardButton("rPCAPfour")}
            <Row className="show-grid">
              <Col xs={12}>
                <div ref={(rPCAPfour)=>{this.rPCAPfour = rPCAPfour}}>
                  <p>#         #         #<br/>
                  ##Stops Capture## <br/>
                  monitor capture CAP1 stop </p><br/><br/>
                </div>
              </Col>
            </Row>
          </div>
          <div>
            {this.clipboardButton("rPCAPfive")}
            <Row className="show-grid">
              <Col xs={12}>
                <div ref={(rPCAPfive)=>{this.rPCAPfive = rPCAPfive}}>
                  <p>#         #         #<br/>
                  ##removes configuration## <br/>
                  No ip access-list extended HOSTCAP <br/>
                  No monitor capture CAP1 </p><br/><br/>
                </div>
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
      <div>
        <div>
          {this.clipboardButton("sPCAPone")}
          <Row className="show-grid">
            <Col xs={12}>
              <div ref={(sPCAPone)=>{this.sPCAPone = sPCAPone}}>
                <p>#         #         #<br/>
                  ##Sets Capture parameters <br/>
                  !GLOBAL CONFIGURATION MODE <br/>
                  conf t <br/>
                  ip access-list extended HOSTCAP <br/>
                  permit ip
                  <b contentEditable="true" suppressContentEditableWarning={true}> <mark>10.0.0.0</mark> </b>
                  <b contentEditable="true" suppressContentEditableWarning={true}> <mark>10.30.0.0</mark> </b></p><br/>
                <p>#         #         #<br/>
                  ## Attaches filter## <br/>
                  !PRIVLEGED EXEC <br/>
                  end <br/>
                  monitor capture buffer CAP1 <br/>
                  monitor capture buffer CAP1 filter access-list HOSTCAP </p><br/>
                <p>#         #         #<br/>
                  ##Creates named capture point## <br/>
                  monitor capture point ip cef cef1 all both <br/>
                  monitor capture point ip process-switched process-switched1 both <br/>
                  monitor capture point ip process-switched process-switched2 from-us </p><br/>
                <p>#         #         #<br/>
                  ## Associates interface to capture point name## <br/>
                  monitor capture point associate cef1 CAP1 <br/>
                  monitor capture point associate process-switched1 CAP1 <br/>
                  monitor capture point associate process-switched2 CAP1 </p><br/>
                <p>#         #         #<br/>
                  ##Starts Capture## <br/>
                  monitor capture point start cef1 <br/>
                  monitor capture point start process-switched1 <br/>
                  monitor capture point start process-switched2 </p><br/><br/>
              </div>
            </Col>
          </Row>
        </div>
        <div>
          {this.clipboardButton("sPCAPtwo")}
          <Row className="show-grid">
            <Col xs={12}>
              <div ref={(sPCAPtwo)=>{this.sPCAPtwo = sPCAPtwo}}>
                <p>#         #         #<br/>
                  ##Shows capture## <br/>
                  show monitor capture buffer all parameters <br/>
                  show monitor capture buffer CAP1 dump | i Vl </p><br/><br/>
              </div>
            </Col>
          </Row>
        </div>
        <div>
          {this.clipboardButton("sPCAPthree")}
          <Row className="show-grid">
            <Col xs={12}>
              <div ref={(sPCAPthree)=>{this.sPCAPthree = sPCAPthree}}>
                <p>#         #         #<br/>
                  ##Stops Capture## <br/>
                  monitor capture point stop cef1 <br/>
                  monitor capture point stop process-switched1 <br/>
                  monitor capture point stop process-switched2 <br/>
                  no monitor capture buffer CAP1 <br/>
                  no monitor capture point ip cef cef1 all both <br/>
                  no monitor capture point ip process-switched process-switched1 all both
                  no monitor capture point ip process-switched process-switched2 from-us </p><br/><br/>
              </div>
            </Col>
          </Row>
        </div>
        <div>
          {this.clipboardButton("sPCAPfour")}
          <Row className="show-grid">
            <Col xs={12}>
              <div ref={(sPCAPfour)=>{this.sPCAPfour = sPCAPfour}}>
                <p>
                  #         #         #<br/>
                  ##Exports PCAP## <br/>
                  monitor capture buffer CAP1 export tftp://
                  <b contentEditable="true" suppressContentEditableWarning={true}><mark>11.16.15.16</mark></b>
                  <b>/</b>
                  <b contentEditable="true" suppressContentEditableWarning={true}><mark>mega-yards2-s1</mark></b>
                  .pcap </p><br/><br/>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      </Popover>
    )
  }

  fiaTrace(){
    const textIdent = {
      textIndent: "25px"
    }
    return (
      <Popover id="popover-trigger-click-root-close" title="fiaTrace">
        <div>
          <div>
            {this.clipboardButton("fiaTraceOne")}
            <Row className="show-grid">
              <Col xs={12}>
                <div ref={(fiaTraceOne)=>{this.fiaTraceOne = fiaTraceOne}}>
                  #         #         #<br/>
                  ##Identifies traffic and starts fiaTrace## <br/>
                  !GLOBAL CONFIGURATION MODE
                  conf t <br/>
                  no ip access-list extended acl-fia <br/>
                  ip access-list extended acl-fia <br/>
                  <p style={textIdent} >
                    permit ip host
                    <b contentEditable="true" suppressContentEditableWarning={true}> <mark>10.0.0.1</mark> </b>
                    <b contentEditable="true" suppressContentEditableWarning={true}> <mark>10.30.0.0</mark> </b>
                    <b contentEditable="true" suppressContentEditableWarning={true}> <mark>255.255.0.0</mark> </b><br/>
                  </p>
                  <p>
                    !PRIVLEGED EXEC <br/>
                    end <br/>
                    debug platform condition ipv4 access-list acl-fia both <br/>
                    debug platform condition start <br/>
                    debug platform packet-trace packet 1024 fia-trace <br/>
                    debug platform packet-trace enable <br/><br/>
                  </p>
                </div>
              </Col>
            </Row>
          </div>
          <div>
            {this.clipboardButton("fiaTraceTwo")}
            <Row className="show-grid">
              <Col xs={12}>
                <div ref={(fiaTraceTwo)=>{this.fiaTraceTwo = fiaTraceTwo}}>
                  <p>
                    #         #         #<br/>
                    ##Display fiaTrace results## <br/>
                    !PRIVLEGED EXEC <br/>
                    end <br/>
                    show platform packet-trace summary <br/>
                    show platform packet-trace packet 1 <br/><br/>
                  </p>
                </div>
              </Col>
            </Row>
          </div>
          <div>
            {this.clipboardButton("fiaTraceThree")}
            <Row className="show-grid">
              <Col xs={12}>
                <div ref={(fiaTraceThree)=>{this.fiaTraceThree = fiaTraceThree}}>
                  <p>
                    #         #         #<br/>
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
                </div>
              </Col>
            </Row>
          </div>
        </div>

      </Popover>
    )
  }

  modalRenderer(modalObj){
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
    if (modalObj === null){
      return (
        <div> No Data</div>
      )
    } else {
      return modalObj.map((data,dataKey)=>{
        let thArray = [];
        let tdArray = [];
        thArray[dataKey] =[]
        tdArray[dataKey] =[]
        for (var [key, value] of Object.entries(data)) {
          if (key == "ipAddress"){
            thArray[dataKey].push(<th key={Math.random()}>{key}</th>)
            tdArray[dataKey].push(<td key={Math.random()}><IsRole role={['admin']}>{value}</IsRole></td>)
          } else if (
            key == "pid" || key == "deviceId" || key == "series" || key == "isisSupport" ||
            key == "serialNo" || key == "instanceUuid" || key == "id" || key == "mappedPhysicalInterfaceId" ||
            key == "mappedPhysicalInterfaceId" || key == "mappedPhysicalInterfaceName" ||
            key == "ifIndex" || key == "ospfSupport" || key =="lastUpdated" || key == "ipv4Address" ||
            key == "ipv4Mask" || key == "interfaceType" || key == "className" || key == "downAsOf" ||
            key == "mediaType" || key == "featureVersion" || key == "hostId" || key == "maxUsage" ||
            key == "validityPeriodRemaining" || key == "usageCountRemaining" || key == "isEulaAccepted" ||
            key == "nativeVlanId"
          )
            {
              // do nothing with these matches

          } else {
            thArray[dataKey].push(<th key={Math.random()}>{key}</th>)
            tdArray[dataKey].push(<td key={Math.random()}>{value}</td>)
          }
        }
        return renderMe(thArray[dataKey],tdArray[dataKey])
      })
      }
    }

    adminMenu(dbID) {
      return (
        <Popover id="popover-trigger-click-root-close" title="Adminstrative Buttons" >
          <ButtonToolbar>
            <ButtonGroup vertical block>
            <Button bsStyle="primary" onClick={()=>{console.log(dbID)}}>apicRemove</Button>
            <Button bsStyle="primary" onClick={()=>{Meteor.call('apicDbRemove',dbID, function(error, result){ if (error){console.log(error)}})}}>mongoRemove</Button>
            <Button bsStyle="primary" onClick={()=>{console.log(dbID)}}>apicRescan</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Popover>
      )
    }


  returnLayout() {
    let findField = this.props.apic.apicDevicesFind.deviceName;
    let sortField = this.props.apic.sortBy.field;
    let sortOrderField = this.props.apic.sortBy.order;
    let findLimit =  this.props.dbFindLimit;
    //console.log(findLimit)
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
    let reachCheck = (status,failureInfo,dbID)=>{
      const FailureToolTip = createReactClass({
        render() {
          let tooltip = <Tooltip id={this.props.id}>{this.props.tooltip} {"MongoDB_ID: "+dbID}</Tooltip>;

          return (
            <OverlayTrigger
              overlay={tooltip} placement="top"
              delayShow={300} delayHide={150}
            >
              <p>{this.props.children}</p>
            </OverlayTrigger>
          );
        }
      });
      const SuccessToolTip = createReactClass({
        render() {
          let tooltip = <Tooltip id={this.props.id}>{"MongoDB_ID: "+dbID}</Tooltip>;

          return (
            <OverlayTrigger
              overlay={tooltip} placement="top"
              delayShow={300} delayHide={150}
            >
              <p>{this.props.children}</p>
            </OverlayTrigger>
          );
        }
      });
      if(status == 'Reachable'){
        return (
          <SuccessToolTip tooltip={failureInfo} id="tooltip-1">
            <mark style={passStyle}>{status}</mark>
          </SuccessToolTip>
        )
      } else {
        return (
          <FailureToolTip tooltip={failureInfo} id="tooltip-1">
            <mark style={failStyle}>{status}</mark>
          </FailureToolTip>
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
    if (findField.length >= 1 || findField == "."){
      //console.log(findField.length)
      //console.log(findField)
      let dbData = this.props.dbReturn(findField,sortField,sortOrderField,findLimit);
      let colData = dbData.map((data)=>{
        let status = data.siteData.dataObj.reachabilityStatus;
        let mgmtIpAddress = data.siteData.dataObj.managementIpAddress;
        let vlanDetail = data.siteData.dataObj.vlanDetail;
        let role = data.siteData.dataObj.role;
        let series = data.siteData.dataObj.series;
        let failureInfo = data.siteData.dataObj.reachabilityFailureReason ? data.siteData.dataObj.reachabilityFailureReason  : "noData";
        let interfaceDetail = data.siteData.dataObj.interfaceDetail;
        let licenseDetail = data.siteData.dataObj.licenseDetail;
        let hostName = data.siteData.dataObj.hostname;
        let family = data.siteData.dataObj.family;
        let dbMongoID = data["_id"];
        let deviceUuid = data.siteData.dataObj.id;
        let commandRunnerData = data.siteData.dataObj.commandRunner;
        let deviceDataObj = new Object();
        deviceDataObj.interfaceDetail = interfaceDetail;
        deviceDataObj.hostName = hostName;
        deviceDataObj.vlanDetail = vlanDetail;
        deviceDataObj.licenseDetail = licenseDetail;
        deviceDataObj.dbMongoID = dbMongoID;
        deviceDataObj.deviceUuid = deviceUuid;
        deviceDataObj.commandRunnerData = commandRunnerData;
        const roleCheck = (role) => {
          if (Roles.userIsInRole(Meteor.userId(), role)){
            return (
              <Col xs={5} sm={6} md={2}><a href={sshLinkGen(mgmtIpAddress)}>{mgmtIpAddress}</a></Col>
            )
          } else {
            return (
              <Col xs={5} sm={6} md={2}>{mgmtIpAddress}</Col>
            )
          }
        }
        const roleCheckHostName = (role,roleHostName,roleHostIpAddress,roleSwitchExpression) => {
          if (Roles.userIsInRole(Meteor.userId(), role)){
            switch(roleSwitchExpression) {
              case "Wireless Controller":
              return (
                <a href={"https://"+roleHostIpAddress} target="_blank">{roleHostName}</a>
              )
              break;
              case "Security and VPN":
              return (
                <a href={"https://"+roleHostIpAddress} target="_blank">{roleHostName}</a>
              )
              break;
              default:
              return (
                <div>{roleHostName}</div>
              )
            }

          } else {
            return (
              <div>{roleHostName}</div>
            )
          }
        }
        const commandRunnerCheck = (cmdRunner) =>{
          // debug
          //console.log(cmdRunner);
          const createMarkup = (dangerStr) =>{
            return dangerouslySetInnerHTML={__html:dangerStr};
          }
          const stringReplace = (string) => {
            const textColor = (textString)=>{
              switch (textString) {
                case "Active":
                return (<mark style={{backgroundColor:"#d9534f"}} dangerouslySetInnerHTML={createMarkup(textString)}></mark>)
                break;
                default:
                return textString;
              }
              console.log(textColor(string))
              return textColor(string);
            }
            const strReplace1 = string.replace(/\\n/g," <br/> ");
            const strReplace2 = strReplace1.replace(/["{}]/g,"");
            const strReplace3 = strReplace2.replace(/Active|Passive/gi,function myFunction(x){console.log(textColor(x)) return textColor(x)});
            return strReplace3;
          }
          if (cmdRunner) {
            const commandRunnerString =  JSON.stringify(cmdRunner["SUCCESS"]);
            // simple error checking
            if (cmdRunner["BLACKLISTED"].length > 5 || cmdRunner["FAILURE"] > 5) {
              console.log(cmdRunner)
            }
            // debug
            //console.log(tempCommand.replace(/\\n/g," "));

            return (
              <div dangerouslySetInnerHTML={createMarkup(stringReplace(commandRunnerString))}></div>
            )
          }else {
            return " ";
          }
        }
        return (
          <div key={dbMongoID} style= {divStyles}>
            <Row className="show-grid" style={rowStylesMain}>
              <Col xs={8} sm={6} md={3}>{roleCheckHostName("admin",hostName,mgmtIpAddress,family)}</Col>
              <Col xs={6} sm={6} md={2}>{data.siteData.dataObj.role}</Col>
              <Col xs={6} sm={6} md={6}>Updated @ UTC {data.siteData.dataObj.lastUpdated}</Col>
            </Row>
            <Row className="show-grid">
              <Col xs={5} sm={6} md={2}><IsRole role={['admin']}>{roleCheck("admin")}</IsRole></Col>
              <Col xs={6} sm={6} md={2}>{reachCheck(status, failureInfo, dbMongoID)} </Col>
              <Col xs={6} sm={6} md={2}>Ver: {data.siteData.dataObj.softwareVersion}</Col>
              <Col xs={6} sm={6} md={3}>Up Time: {data.siteData.dataObj.upTime}</Col>
              <Col xs={6} sm={6} md={1}>Int#: {data.siteData.dataObj.interfaceCount}</Col>
              <Col xs={6} sm={6} md={1}><IsRole role={['admin']}><div>{data.siteData.dataObj.serialNumber}</div></IsRole></Col>
              <Col xs={6} sm={6} md={4}>{data.siteData.dataObj.series}</Col>
              <ButtonToolbar>
                {vlanDetail ? <ApicModal modalData={this.modalRenderer(deviceDataObj.vlanDetail)} buttonName={"VlanData"} hostName={hostName}/> : ""}
                {interfaceDetail ? <ApicModal modalData={this.modalRenderer(deviceDataObj.interfaceDetail)} buttonName={"interfaceData"} hostName={hostName}/> : ""}
                {licenseDetail ? <ApicModal modalData={this.modalRenderer(deviceDataObj.licenseDetail)} buttonName={"licenseDetail"} hostName={hostName}/> : ""}
                {fiaDetail(role) ? <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={this.fiaTrace()}>
                  <Button bsSize="xsmall">fiaTrace</Button>
                </OverlayTrigger> : ""}
                {fiaDetail(role) ? <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={this.routerPcap()}>
                  <Button bsSize="xsmall">rPCAP</Button>
                </OverlayTrigger> : ""}
                {switchPcapDetail(series) ? <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={this.switchPcap()}>
                  <Button bsSize="xsmall">sPCAP</Button>
                </OverlayTrigger> : ""}
                <IsRole role={['admin']}>
                  <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={this.adminMenu(deviceDataObj.dbMongoID)}>
                    <Button bsSize="xsmall">admin</Button>
                  </OverlayTrigger>
              </IsRole>
              <IsRole role={['admin']}>{this.props.showCommandButton(deviceDataObj.deviceUuid,deviceDataObj.dbMongoID)}</IsRole>
              </ButtonToolbar>
            </Row>
            {commandRunnerCheck(deviceDataObj.commandRunnerData)}
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
        <ScrollHandler scrollFunction={this.props.setDbFindLimit} scrollTotal={20} scrollCurrent={this.props.dbFindLimit} scrollBy={15}>
          {this.returnLayout()}
        </ScrollHandler>
      </div>
    )
  }
}
