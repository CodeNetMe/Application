var express = require('express');
var wagner = require('wagner-core');


//linking to the file with the mongoose models
require('./models')(wagner);
//require('./dependencies')(wagner);

var app = express();

//Make the server use the api file for routing
app.use('/api/v1', require('./api')(wagner));


// Set up the server to serve the folders proceeded by a '.' when a given path is specified.
app.use(express.static('./bin', { maxAge: 4 * 60 * 60 * 1000 /* 2hrs */ }));
app.use('/public', express.static('./public', { maxAge: 4 * 60 * 60 * 1000 /* 2hrs */ }));
app.use('/css', express.static('./css', { maxAge: 4 * 60 * 60 * 1000 /* 2hrs */ }));


//set the port on which this application will listen.
app.listen(3000);
console.log('Listening on port 3000!');