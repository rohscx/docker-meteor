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
      paddingTop: '5%',
      paddingButtom: '5%'
    }
    const rowStylesMain = {
      fontWeight: "bold"
    }
    const flexItem = {
      backgroundColor: "cornflowerblue",
      width: "flex",
      height: "flex",
      margin: "10px",
      paddingLeft: "5%",
      paddingRight:"5%"
    }


    let dbData = this.props.dbReturn(findField,sortField,sortOrderField,findLimit);
    return dbData.map((data,key)=>{
      console.log(data)
      console.log(data._id)
      console.log(data.webServerData.dataObj.name)
      return (
        <div key={data._id} style= {divStyles}>
          <div style= {flexItem}>
            <Row className="show-grid" style={rowStylesMain}>
              <Col xs={8} sm={6} md={6}>{data._id}</Col>
            </Row>
            <Row className="show-grid">
              <Col xs={6} sm={6} md={6}>{data.webServerData.dataObj.name}</Col>
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
    justifyContent: "center",
    backgroundColor: "lightgrey",
  }
    console.log(this)
    return(
      <div style= {flexContainer}>
        {this.returnLayout()}
      </div>
    )
  }
}
