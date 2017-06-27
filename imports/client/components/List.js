import React, {Component} from 'react';
import { Session } from 'meteor/session';

export default class List extends Component {
  handleChange(){
    console.log(this);
  }
/*
<h3>{Object.entries(this.props.item.apicData.dataObj.response["0"]).map(([key,value])=>{
  return (
    <h3>{key} : {value}</h3>
  );
})}
</h3>
*/

  render() {
      return(
        <div>
            <p>TEST DATA</p>
        </div>
      )
  }
}
