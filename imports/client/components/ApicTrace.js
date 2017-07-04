import React, {Component} from 'react';
import { Session } from 'meteor/session';

export default class ApicTrace extends Component {

  constructor(props) {
  super(props);
  this.state = {
    value: {
      source:'',
      destination:''
    }};

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value:{source: event.target.value}});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value.source);
    event.preventDefault();
  }



  static defaultProps = {
    categories: ['Web Design', 'Web Development', 'Mobile Development']
  }


  traceForm(){
      if(this.props.showTrace){
        return (
          <form onSubmit={this.handleSubmit}>
            <div className='trace'>
              <div className='source'>
                <label> Source </label>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
            </div>
            <div className='destination'>
              <label> Destination </label>
              <input type="text />
            </div>
            </div>
            <input type="submit" value="Submit" className="btn"/>
          </form>

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
      <div>
        {this.traceForm()}
      </div>
      )
  }
}
