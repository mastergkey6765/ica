const { SquareClient } = require('square');
const client = new SquareClient({token: 'fake', environment: 'sandbox'});
console.log(client.payments.create.toString());
