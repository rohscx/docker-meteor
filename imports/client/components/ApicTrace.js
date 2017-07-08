import React, {Component} from 'react';
import { Session } from 'meteor/session';
import Trace from './ApicTrace/Trace';
import { connect } from 'react-redux';
import { setName }from '../actions/userActions'
import { setTicket, setDevices, setTrace, setFlowId, setFlow, setShowTrace, setTraceIp, getTicket, getFlowId, getFlow }from '../actions/apicActions'

class ApicTrace extends Component {

  constructor(props) {
  super(props);
  this.state = {
    sourceIP: null,
    destinationIP: null,
    traceReady: true
  };

  this.handleChangeSourceIP = this.handleChangeSourceIP.bind(this);
  this.handleChangeDestinationIP = this.handleChangeDestinationIP.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
     this.setState({
       sourceIP:'1.1.1.1',
       destinationIP:'2.2.2.2.'
     });
   }

  handleChangeSourceIP(event) {
    this.setState({sourceIP: event.target.value});
  }
  handleChangeDestinationIP(event) {
    this.setState({destinationIP: event.target.value});
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
                <input type="text" value={this.props.traceIp.source} onChange={this.handleChangeSourceIP} />
            </div>
            <div className='destination'>
              <label> Destination </label>
              <input type="text" value={this.props.traceIp.destination} onChange={this.handleChangeDestinationIP}/>
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

  loopThrough(flowArray){
    return flowArray.map(item => {

      console.log("LENTHGH",item.length);
      if(item.length == 0){
        return <Trace flowItem={'NOT:'} flowIndex={'READY'} key={index} />;
      }else{
        return Object.keys(item).map(function(key,index){
          console.log("item[key]: ",item[key]);
          console.log("key: ",key);
          console.log("index: ",index);
          console.log("item: ", item);
          console.log("typeof item: ",typeof item);
          console.log("typeof item[key]: ",typeof item[key]);
          console.log("typeof key: ",typeof key);
          console.log("typeof index: ",typeof index);

          if(typeof item[key] === 'object'){
            console.log("item[key].physicalInterface.name: ",key,item[key].physicalInterface.name);
            return <Trace flowItem={item[key].physicalInterface.name} flowIndex={key} key={index} />;
          } else {
            return <Trace flowItem={item[key]} flowIndex={key} key={index} />;
          }
        })
      }
    })
  }

  render() {
    console.log(this);
    return(
      <div>
      {this.props.apic.ticket} <br/>
      {this.props.apic.flowId} <br/>
      <button onClick={
        () => this.props.getTicket()
      }>GET TICKET</button>
      <button onClick={
        () => this.props.getFlowId(this.props.apic.ticket)
      }>GET FLOW ID</button>
      <button onClick={
        () => this.props.getFlow(this.props.apic.ticket, this.props.apic.flowId)
      }>GET FLOW</button>
      <button onClick={
        () => console.log(this.props)
      }>LOG PROPS</button>
      {this.loopThrough(this.props.apic.flow)}
      {this.traceForm()}
    </div>
    )
  }
}

const mapSateToProps = (state) => {
  return {
    user: state.userReducer,
    math: state.mathReducer,
    apic: state.apicReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setName: (name) => {
      dispatch(setName(name));
    },
    setTicket: (ticket) => {
      dispatch(setTicket(ticket));
    },
    setDevices: (devices) => {
      dispatch(setDevices(devices));
    },
    setTrace: (trace) => {
      dispatch(setTrace(trace));
    },
    setTraceIp: (traceIp) => {
      dispatch(setTraceIp(traceIp));
    },
    setFlowId: (flowId) => {
      dispatch(setTrace(trace));
    },
    setShowTrace: (showTrace) => {
      dispatch(setShowTrace(showTrace));
    },
    getTicket: () => {
      dispatch(getTicket());
    },
    getFlowId: (ticket) => {
      dispatch(getFlowId(ticket));
    },
    getFlow: (ticket,flowId) => {
      dispatch(getFlow(ticket,flowId));
    }
  };
};
export default connect(mapSateToProps, mapDispatchToProps) (ApicTrace);
