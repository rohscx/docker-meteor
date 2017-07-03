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

        <div className='item'>
          <div className='vote-one' onClick={this.voteOne.bind(this)}>
            <label>Source</label>
            <input type="source" ref="sourceIP" />
        </div>
        <span>VS</span>
        <div className='vote-two' onClick={this.voteTwo.bind(this)}>
          <label>Destination</label>
          <input type="destination" ref="destinationIP" />
        </div>
        </div>


        /*
        <div className='item'>
          <h3>Apic Trace</h3>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className='vote-one'>

            </div>
            <span>VS</span>
            <div className='vote-two'>

            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
        */
      )
  }
}
