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

    traceForm(){
        if(this.props.showTrace){
          return (
            <div className='trace'>
              <div className='source'>
                <label> Source </label>
                <input type="source" ref="sourceIP" />
            </div>
            <div className='destination'>
              <label> Destination </label>
              <input type="destination" ref="destinationIP" />
            </div>
            </div>
          );
        } else {
          return (
            <div/>
          );
        }
    }

  render() {
    let categoryOptions = this.props.categories.map(category => {
      return <option key={category} value="category">{category}</option>
    });
    console.log(this);
      return(
      <form>
        {this.traceForm()}
      </form>
      )
  }
}
