import React, {Component} from 'react';
import { Session } from 'meteor/session';

export default class ApicTrace extends Component {
  static defaultProps = {
    categories: ['Web Design', 'Web Development', 'Mobile Development']
  }

  handleSubmit(e){
    console.log(this.refs.title.value);
    e.preventDefault();
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
              <label>Test--Title</label>
              <input type="test" ref="testTitle" />
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
