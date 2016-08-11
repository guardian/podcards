// dependancies
var static = require('node-static');

var config = require('../scripts/config.json');

var file = new static.Server('./build', {
    'cache': 0,
    'headers': {
        'Access-Control-Allow-Origin': '*'
    }
});

console.log("serving");

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(config.local.port);