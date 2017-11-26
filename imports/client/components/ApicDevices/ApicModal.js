import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';
import {Row,Col,Clearfix,Popover,ButtonToolbar,OverlayTrigger,Button,Tooltip,Modal} from 'react-bootstrap';

class ApicModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lgShow: false,
    };
    that = this;
  };
  getInitialState() {
    return { lgShow: false };
  };

  close() {
    that.setState({ lgShow: false });
  };

  open() {
    that.setState({ lgShow: true });
  };

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
            key == "mediaType"
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


  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );


    console.log(that)
    console.log(that.props.interfaceDetail)
    return (
      <div>

        <Button
          bsSize="xsmall"
          onClick={that.open}
        >
          {that.props.modalName}
        </Button>

        <Modal show={that.state.lgShow} onHide={that.close} bsSize="large" aria-labelledby="contained-modal-title-lg">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">{that.hostName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

            <h4>Popover in a modal</h4>
            <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>

            <h4>Tooltips in a modal</h4>
            <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>

            <hr />

            <h4>Overflowing text to show scroll behavior</h4>
            <div style={{fontSize:"78%"}}>{that.modalRender()}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={that.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default ApicModal;
