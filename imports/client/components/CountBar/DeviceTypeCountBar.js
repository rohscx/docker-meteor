import React, {Component} from 'react';
import Modal from 'react-modal';
import { Session } from 'meteor/session';
import {Row,Col,Clearfix,Popover,ButtonToolbar,OverlayTrigger,Button,Tooltip} from 'react-bootstrap';

export default class DeviceTypeCountBar extends Component {
  constructor() {
    super();

    this.state = {
    };

  }

  returnLayout() {
    let findField1 = {"siteData.dataObj.family":"Unified AP"};
    //console.log(findLimit)
    let passStyle = {
      backgroundColor:"#5cb85c"
    }
    let failStyle = {
      backgroundColor:"#d9534f"
    }
    const divStyles = {
      paddingTop: '0%',
      paddingButtom: '0%'
    }
    const rowStylesMain = {
      fontWeight: "bold"
    }
    const flexItemGenerator = (wsfS,rsC,rT) => {
      let flexObj1 = (color)=> {
        return {
          backgroundColor: color,
          width: "299px",
          height: "flex",
          margin: "5px",
        };
      }
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - rT;
      console.log("timeDiff",timeDiff);
      if (wsfS === 0 && rsC === 200 && timeDiff <= 30000) {
        return flexObj1("#5cb85c");
      } else {
        return flexObj1("#d9534f");
      }
    }
    const rTTCalculator = (rtT,rtC) =>{
      return Math.round(rtT/rtC);
    }

    let dbData = this.props.dbCount(findField1);
    console.log(dbData);

    return (
      <div key={1} style= {divStyles} target="_blank" onClick={(event) => {event.preventDefault(); window.open("www.google.com")}} >
        <div style= {{backgroundColor:"#d9534f",width: "299px",height: "flex",margin: "5px"}}>
          <Row className="show-grid" style={rowStylesMain} className="container-fluid">
            <Col xs={6} sm={6} md={12}> {dbData}</Col>
          </Row>
          <Row className="show-grid" className="container-fluid">
            <Col xs={6} sm={6} md={6}> Yo!!!!</Col>
          </Row>
        </div>
      </div>
    )

  }

render() {
  const flexContainer = {
    display: "-webkit-flex",
    display: "flex",
    flexWrap: "wrap",
    width: "flex",
    height: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
    console.log(this)
    return(
      <div style= {flexContainer} className="container-fluid">
        {this.returnLayout()}
      </div>
    )
  }
}
