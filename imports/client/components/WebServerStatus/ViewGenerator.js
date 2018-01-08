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
      paddingButtom: '0%',
      display:'flex'
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
      // debug
      //console.log("timeDiff",timeDiff);
      if (wsfS === 0 && rsC === 200 && timeDiff <= 30000) {
        return flexObj1("#5cb85c");
      } else {
        return flexObj1("#d9534f");
      }
    }
    const rTTCalculator = (rtT,rtC) =>{
      return Math.round(rtT/rtC);
    }
    const adminStatusSytles = (adminStatus) =>{
      let adminStyle = (adminStatusBackground) => {
        return {
          margin: "auto",
          width:"30%",
          height:"50px",
          margin:"5px",
          backgroundColor:adminStatusBackground
        };
      }
      if (adminStatus == 1) {
        return adminStyle("#d9534f")
      } else {
        return adminStyle("#5cb85c")
      }
    }
    const centerStyle = {
      textAlign:"center",
      margin:"auto",
      width:"50%",
      height:"50%",
      top:"25%",
      position:"relative"
    }
    let dbData = this.props.dbReturn(findField,sortField,sortOrderField,findLimit);
    return dbData.map((data,key)=>{
      // debug
      /*
      console.log(data)
      console.log(data._id)
      console.log(data.webServerData.dataObj.name)
      console.log(data.webServerData.dataObj.adminStatus.enable)
      */
      return (
        <div key={data._id} style= {divStyles} >
          <div
            style= {flexItemGenerator(data.webServerData.dataObj.httpRequest.webServerFailureStatus,data.webServerData.dataObj.httpRequest.responseStatusCode,data.webServerData.requestTime)}
            target="_blank" onClick={(event) => {event.preventDefault(); window.open(data.webServerData.dataObj.url)}}
            >
            <Row className="show-grid" style={rowStylesMain} className="container-fluid">
              <Col xs={6} sm={6} md={12}> {data.webServerData.dataObj.name}</Col>
            </Row>
            <Row className="show-grid" className="container-fluid">
              <Col xs={6} sm={6} md={6}> {rTTCalculator(data.webServerData.dataObj.statistics.responseTimeTotal,data.webServerData.dataObj.statistics.responseTimeCount)}ms</Col>
            </Row>
          </div>
          <div
            style= {adminStatusSytles(data.webServerData.dataObj.adminStatus.enable)}
            onClick={()=> {this.props.setAdminStatus(data._id,data.webServerData.dataObj.adminStatus.enable)}}
            >
            <div style={centerStyle}>
              {data.webServerData.dataObj.adminStatus.enable == 1 ? "Disable":"Enable"}
            </div>
          </div>
        </div>
      )
    })

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
    // debug
    //console.log(this)
    return(
      <div style= {flexContainer} className="container-fluid">
        {this.returnLayout()}
      </div>
    )
  }
}
