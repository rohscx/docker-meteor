let object = new restRequest('GET', 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/host', {
        headers: { 'conten-type': 'application/json'}
});
// console.log(object); // debug

// Requests NEW ticket from APIC
object.makeTicket(); 

// console.log(object); // debug

export default class ItemApic extends Component {
         
   render() {
     return (
       <div className='ItemApic'>
         <div className='apic-list' onClick={console.log('List Clicked')}>
         <span>CATS{this.props.object.statusCode.value}</span>
         <h3>DOGS{this.props.object.statusCode.text}</h3>
       </div>
       </div>
     )
   }
 }
