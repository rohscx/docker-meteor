import http from 'http';

HTTP.call( 'POST', 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket', {
  data: {
    "username": "devnetuser",
    "password": "Cisco123!"
  }
}, function( error, response ) {
  if ( error ) {
    console.log( error );
  } else {
    console.log( response );
    /*
     This will return the HTTP response object that looks something like this:
     {
       content: "String of content...",
       data: {
         "id": 101,
         "title": "Title of our new post",
         "body": "Body of our new post",
         "userId": 1337
       },
       headers: {  Object containing HTTP response headers }
       statusCode: 201
     }
    */
  }
});

export default HTTP;
