import React, {Component} from 'react';
import { Session } from 'meteor/session';

export default class Devices extends Component {
  render() {
    returnList = this.props.prtgItems.map((data)=>{
      let newData = data.prtgData.dataObj;
      // debug
      //console.log(data.prtgData.dataObj);
      //console.log("DB_ID",data["_id"])
      return (
        <div key={data._id}>
          <table className = "table table-striped table-hover table-responsive">
            <thead>
              <tr>
                <th>ACA</th>
                <th>Device Name</th>
                <th>Status</th>
                <th>Sensor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{newData.group}</td>
                <td>{newData.device}</td>
                <td>{newData.status}</td>
                <td>{newData.sensor}</td>
              </tr>
            </tbody>
          </table>
        </div>

      );
    })
    console.log(this)
    return(
      <div>
        {returnList}
      </div>
    )
  }
}
