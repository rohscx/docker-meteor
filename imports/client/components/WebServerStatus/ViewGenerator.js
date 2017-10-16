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

    let dbData = this.props.dbReturn(findField,sortField,sortOrderField,findLimit);
    dbData.map((data,key)=>{
      console.log(key+" : "+data)
      return (
        <div key={data["_id"]} style= {divStyles}>
          <div>TEST DTA</div>
          <Row className="show-grid" style={rowStylesMain}>
            <Col xs={8} sm={6} md={3}>{data._id}</Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} sm={6} md={2}>{data.webServerData.dataObj.name}</Col>
          </Row>
        </div>
      )
    })

  }

render() {
    console.log(this)
    return(
      <div>
        {this.returnLayout()}
      </div>
    )
  }
}
