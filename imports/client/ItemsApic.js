// creates NEW Object for the rest request
let object = new restRequest('GET', 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/host', {
        headers: { 'conten-type': 'application/json'}
});
// console.log(object); // debug

// Requests NEW ticket from APIC
object.makeTicket(); 

// console.log(object); // debug
