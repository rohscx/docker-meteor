import React, {Component} from 'react';
import { Session } from 'meteor/session';

export default class ApicTrace extends Component {
  static defaultProps = {
    categories: ['Web Design', 'Web Development', 'Mobile Development']
  }

  handleSubmit(e){
    e.preventDefault();
    console.log(this);
    }

  render() {
    let categoryOptions = this.props.categories.map(category => {
      return <option key={category} value="category">{category}</option>
    });
    console.log(this);
      return(
        <div>
          <h3>Apic Trace</h3>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div>
              <label>Source</label>
              <input type="source" ref="sourceIP" />
              <label>Source</label>
              <input type="destination" ref="destinationIP" />
            </div>
            <div>
              <label> Categ </label><br/>
              <select ref="categ">
                {categoryOptions}
              </select>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      )
  }
}
