import React, {Component} from 'react';
import Modal from 'react-modal';
import { Session } from 'meteor/session';
import {Row,Col,Clearfix,Popover,ButtonToolbar,OverlayTrigger,Button,Tooltip} from 'react-bootstrap';

export default class ViewGenerator extends Component {
  constructor() {
    super();

    this.state = {
    };

  }

  returnLayout() {
    let findField = ".";
    let sortField = "name";
    let sortOrderField = -1;
    let findLimit =  this.props.dbFindLimit;
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
    const flexItemGenerator = (wsfStatus,rsC) => {
      let flexObj1 = (color)=> {
        return {
          backgroundColor: color,
          width: "flex",
          height: "flex",
          margin: "10px",
          paddingLeft: "5%",
          paddingRight:"5%"
        };
      }
      if (wsfStatus === 0 && rsC === 200) {
        return flexObj1("#5cb85c");
      } else {
        return flexObj1("#d9534f");
      }
    }
    const rTTCalculator = (rtT,rtC) =>{
      return Math.round(rtT/rtC);
    }

    let dbData = this.props.dbReturn(findField,sortField,sortOrderField,findLimit);
    return dbData.map((data,key)=>{
      console.log(data)
      console.log(data._id)
      console.log(data.webServerData.dataObj.name)
      return (
        <div key={data._id} style= {divStyles} target="_blank" onClick={(event) => {event.preventDefault(); window.open(data.webServerData.dataObj.url)}} >
          <div style= {flexItemGenerator(data.webServerData.dataObj.httpRequest.webServerFailureStatus,data.webServerData.dataObj.httpRequest.responseStatusCode)}>
            <Row className="show-grid" style={rowStylesMain}>
              <Col xs={12} sm={12} md={12}>{data.webServerData.dataObj.name}</Col>
            </Row>
            <Row className="show-grid">
              <Col xs={6} sm={6} md={6}>{rTTCalculator(data.webServerData.dataObj.statistics.responseTimeTotal,data.webServerData.dataObj.statistics.responseTimeCount)}ms</Col>
            </Row>
          </div>
        </div>
      )
    })

  }

render() {
  const flexContainer = {
    display: "-webkit-flex",
    display: "flex",
    width: "flex",
    height: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
    console.log(this)
    return(
      <div style= {flexContainer}>
        {this.returnLayout()}
      </div>
    )
  }
}
