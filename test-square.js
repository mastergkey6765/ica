const { Client, Environment } = require('square');
console.log(Client ? "Client exists" : "Client missing");
console.log(Environment ? "Environment exists" : "Environment missing");
